# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is an Astro project called "Auth Test Astro JWT" using pnpm as the package manager. It appears to be based on the Astro basics template.

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at localhost:4321 |
| `pnpm build` | Build for production to ./dist/ |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Architecture

This is an Astro project configured for server-side rendering (SSR) with the following structure:

- **src/pages/**: Route-based pages (index.astro is the homepage)
- **src/layouts/**: Shared layout components (Layout.astro provides base HTML structure)
- **src/components/**: Reusable Astro components (Welcome.astro is the main landing component)
- **src/assets/**: Static assets like SVGs
- **public/**: Static files served directly

The project uses:
- TypeScript with strict configuration extending `astro/tsconfigs/strict`
- ESM modules (`"type": "module"` in package.json)
- Astro v5.13.10 with SSR mode (`output: 'server'`)
- Node.js adapter in standalone mode for deployment
- Server configured to bind to `0.0.0.0` for cloud deployment compatibility

## Deployment

Configured for Render.com deployment as a web service:
- **Start Command**: `pnpm start` (runs `node ./dist/server/entry.mjs`)
- **Build Output**: Server bundle in `dist/server/`
- **Port**: Uses `process.env.PORT` or defaults to 10000
- **Host**: Binds to `0.0.0.0` for external traffic

The codebase follows Astro's file-based routing where pages in `src/pages/` become routes. Components use Astro's syntax with frontmatter for server-side logic and JSX-like templates for markup.