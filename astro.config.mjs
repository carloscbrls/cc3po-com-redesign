import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITEMAP_EXCLUDE = ['/linc-test/', '/thanks/', '/sprint/thank-you/'];

export default defineConfig({
  site: 'https://cc3po.com',
  output: 'static',
  integrations: [sitemap({
    filter: (page) => !SITEMAP_EXCLUDE.some((path) => page.endsWith(path)),
    serialize(item) {
      item.lastmod = new Date().toISOString();
      return item;
    },
  })],
});