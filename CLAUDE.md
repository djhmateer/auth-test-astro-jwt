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

This is a standard Astro project with the following structure:

- **src/pages/**: Route-based pages (index.astro is the homepage)
- **src/layouts/**: Shared layout components (Layout.astro provides base HTML structure)
- **src/components/**: Reusable Astro components (Welcome.astro is the main landing component)
- **src/assets/**: Static assets like SVGs
- **public/**: Static files served directly

The project uses:
- TypeScript with strict configuration extending `astro/tsconfigs/strict`
- ESM modules (`"type": "module"` in package.json)
- Astro v5.13.10
- Default Astro configuration (no customizations in astro.config.mjs)

The codebase follows Astro's file-based routing where pages in `src/pages/` become routes. Components use Astro's syntax with frontmatter for server-side logic and JSX-like templates for markup.