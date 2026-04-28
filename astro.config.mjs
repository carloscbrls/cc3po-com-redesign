import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cc3po.com',
  output: 'static',
  integrations: [sitemap()],
});