import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artemkysliakov.github.io',
  integrations: [mdx(), sitemap({
    filter: (page) => page !== 'https://artemkysliakov.github.io/360/'
  })],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
