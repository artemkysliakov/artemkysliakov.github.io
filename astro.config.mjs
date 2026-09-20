import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artemkysliakov.github.io',
  integrations: [mdx(), sitemap({ lastmod: new Date(), changefreq: 'monthly' })],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
