import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [type, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();
const allowed = new Set(['post', 'project', 'resource']);

if (!allowed.has(type) || !title) {
  console.error('Використання: npm run content:new -- post "Назва матеріалу"');
  console.error('Типи: post, project, resource');
  process.exit(1);
}

const map = { а:'a', б:'b', в:'v', г:'h', ґ:'g', д:'d', е:'e', є:'ye', ж:'zh', з:'z', и:'y', і:'i', ї:'yi', й:'y', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'kh', ц:'ts', ч:'ch', ш:'sh', щ:'shch', ь:'', ю:'yu', я:'ya' };
const slug = title.toLowerCase().split('').map((char) => map[char] ?? char).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const collections = { post: 'posts', project: 'projects', resource: 'resources' };
const folder = join(process.cwd(), 'src', 'content', collections[type]);
const file = join(folder, `${slug || 'new-content'}.md`);
const date = new Date().toISOString().slice(0, 10);

const extra = {
  post: 'kind: article',
  project: `area: education\nrole: "Автор"\nyear: "${new Date().getFullYear()}"\nstatus: case-study\nfeatured: false`,
  resource: 'audience: [teachers]\nresourceType: guide'
}[type];

const template = `---
title: "${title.replaceAll('"', '\\"')}"
description: "Короткий опис для картки й пошукових систем"
published: ${date}
draft: true
tags: []
${extra}
---

Напишіть тут основний текст.

## Перший розділ

Матеріал поки має статус чернетки. Коли все готово, змініть \`draft: true\` на \`draft: false\`.
`;

mkdirSync(folder, { recursive: true });
if (existsSync(file)) {
  console.error(`Файл уже існує: ${file}`);
  process.exit(1);
}
writeFileSync(file, template, 'utf8');
console.log(`Створено: ${file}`);
