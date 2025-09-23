// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',          // <-- needed for SSR
  adapter: node({
    mode: 'standalone'       // bundles deps so Render can run it easily
  }),
});
