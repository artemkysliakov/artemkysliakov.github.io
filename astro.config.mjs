import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

/**
 * Keystatic — це редактор вмісту, який потрібен лише локально (npm run edit).
 * На GitHub Pages сайт має лишатися повністю статичним, тому в режимі збірки
 * редактор не підключаємо: жодного серверного коду в dist не потрапляє.
 */
const isEditing = process.env.KEYSTATIC === 'on';

export default defineConfig({
  site: 'https://artem.itnauka.org',
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self'",
        "font-src 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "img-src 'self' data:",
        "manifest-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "worker-src 'none'",
        'upgrade-insecure-requests'
      ]
    }
  },
  integrations: [
    mdx(),
    sitemap({ lastmod: new Date(), changefreq: 'monthly' }),
    ...(isEditing ? [react(), keystatic()] : [])
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  markdown: {
    // Prism uses CSS classes instead of Shiki's inline styles, so CSP can
    // protect published posts that contain fenced code blocks.
    syntaxHighlight: 'prism'
  }
});
