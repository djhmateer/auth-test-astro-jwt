// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',          // <-- needed for SSR
  adapter: node({
    mode: 'standalone'       // bundles deps so Render can run it easily
  }),
  session: {
    ttl: 120               // 1 day timeout (24 hours * 60 minutes * 60 seconds)... test here with 120 seconds
  },
  server: {
    host: '0.0.0.0',         // Bind to all interfaces for Render
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000
  }
});
