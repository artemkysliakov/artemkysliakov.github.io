import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inlineMarkdown } from '../src/lib/inline.ts';
import { serializeJsonLd } from '../src/lib/security.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
let pages = 0;
let inlineScripts = 0;

const fail = (message) => {
  throw new Error(message);
};

const isExecutableScript = (attributes) => {
  const type = attributes.match(/\btype="([^"]+)"/i)?.[1]?.toLowerCase();
  return !type || type === 'module' || /^(?:text|application)\/(?:java|ecma)script$/.test(type);
};

function checkHtml(file) {
  const html = readFileSync(file, 'utf8');
  const cspMeta = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)">/);
  if (!cspMeta) fail(`Missing CSP in ${file}`);

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  const firstExecutableScript = scripts.find((script) => isExecutableScript(script[1]));
  if (firstExecutableScript && html.indexOf(cspMeta[0]) > firstExecutableScript.index) {
    fail(`CSP appears after a script in ${file}`);
  }

  for (const script of scripts) {
    if (/\bsrc=/.test(script[1]) || !isExecutableScript(script[1])) continue;
    const hash = createHash('sha256').update(script[2]).digest('base64');
    if (!cspMeta[1].includes(`'sha256-${hash}'`)) {
      fail(`CSP is missing hash sha256-${hash} for <script${script[1]}> (${script[2].trim().slice(0, 80)}) in ${file}`);
    }
    inlineScripts += 1;
  }

  const analyticsScript = scripts.find((script) =>
    script[1].includes('src="https://static.cloudflareinsights.com/beacon.min.js"')
  );
  if (!analyticsScript || !/\btype="module"/.test(analyticsScript[1])) {
    fail(`Cloudflare Web Analytics module is missing in ${file}`);
  }
  if (!/data-cf-beacon="\{&quot;token&quot;:&quot;[a-f0-9]{32}&quot;\}"/.test(analyticsScript[1])) {
    fail(`Cloudflare Web Analytics token is missing or malformed in ${file}`);
  }
  if (!cspMeta[1].includes('https://static.cloudflareinsights.com/beacon.min.js')) {
    fail(`CSP does not allow the Cloudflare analytics script in ${file}`);
  }
  if (!cspMeta[1].includes("connect-src 'self' https://cloudflareinsights.com")) {
    fail(`CSP does not allow the Cloudflare analytics endpoint in ${file}`);
  }

  if (/href="(?:javascript|data|vbscript):/i.test(html)) {
    fail(`Unsafe link scheme in ${file}`);
  }

  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/\brel="[^"]*\bnoopener\b/.test(link[0])) {
      fail(`target="_blank" link without noopener in ${file}`);
    }
  }

  pages += 1;
}

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) checkHtml(path);
  }
}

if (!existsSync(dist)) fail('dist is missing; run npm run build first');
walk(dist);

for (const href of [
  'javascript:alert%281%29',
  'data:text/html,boom',
  'vbscript:msgbox%281%29'
]) {
  if (/href=/.test(inlineMarkdown(`[x](${href})`))) {
    fail(`inlineMarkdown accepted an unsafe URL scheme: ${href}`);
  }
}

if (!/rel="noopener noreferrer"/.test(inlineMarkdown('[x](https://example.com)'))) {
  fail('External inline Markdown link is missing noopener');
}

const hostileJson = serializeJsonLd({ value: '</script><script>alert(1)</script>\u2028' });
if (hostileJson.includes('</script>') || hostileJson.includes('\u2028')) {
  fail('JSON-LD serialization left a script-breaking character unescaped');
}

if (!existsSync(join(dist, '.well-known', 'security.txt'))) {
  fail('security.txt is missing from the build');
}

console.log(`Security checks passed: ${pages} HTML pages, ${inlineScripts} hashed inline scripts.`);
