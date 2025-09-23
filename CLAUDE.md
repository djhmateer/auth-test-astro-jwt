# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is an Astro project called "Auth Test Astro JWT" using pnpm as the package manager. It features session-based authentication protecting certain routes.

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at localhost:10000 |
| `pnpm build` | Build for production to ./dist/ |
| `pnpm preview` | Preview production build locally |
| `pnpm start` | Start production server (runs `node ./dist/server/entry.mjs`) |
| `pnpm astro ...` | Run Astro CLI commands |

## Architecture

This is an Astro project configured for server-side rendering (SSR) with session-based authentication:

- **src/pages/**: Route-based pages (index.astro is the homepage, login.astro for authentication)
- **src/pages/projects/**: Protected route section requiring authentication
- **src/pages/api/**: API endpoints for authentication (login.ts, logout.ts)
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
- **Astro's built-in session storage** with filesystem persistence for authentication

## Authentication

The project implements session-based authentication using Astro's native session API:

- **Login**: `/login` - Password-protected login form (password: "secret123")
- **Protected Routes**: `/projects/*` - Requires valid session to access
- **Session Storage**: Filesystem-based sessions via Node.js adapter
- **API Endpoints**:
  - `POST /api/login` - Validates password and creates session
  - `POST /api/logout` - Destroys session and redirects to home

### Authentication Flow:
1. User visits `/projects` without session → redirected to `/login`
2. User enters correct password → session created → redirected to `/projects`
3. User can access protected routes while session is valid
4. User clicks logout → session destroyed → redirected to home

### Session Data:
- `authenticated`: boolean flag indicating login status
- `loginTime`: ISO timestamp of when user logged in

## Deployment

Configured for Render.com deployment as a web service:
- **Start Command**: `pnpm start` (runs `node ./dist/server/entry.mjs`)
- **Build Output**: Server bundle in `dist/server/`
- **Port**: Uses `process.env.PORT` or defaults to 10000
- **Host**: Binds to `0.0.0.0` for external traffic

The codebase follows Astro's file-based routing where pages in `src/pages/` become routes. Components use Astro's syntax with frontmatter for server-side logic and JSX-like templates for markup.