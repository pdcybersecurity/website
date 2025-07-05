import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pdc-agency.com',
  output: 'static',
  build: {
    assets: 'assets'
  }
});