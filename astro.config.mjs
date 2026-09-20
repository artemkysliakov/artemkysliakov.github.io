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
  site: 'https://artemkysliakov.github.io',
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
    shikiConfig: { theme: 'github-dark' }
  }
});
