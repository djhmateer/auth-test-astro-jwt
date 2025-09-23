# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is an Astro project called "Auth Test Astro Session" using pnpm as the package manager. It features session-based authentication protecting certain routes.

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
- **src/pages/projects/**: Protected route section requiring authentication (index.astro, project2.astro)
- **src/pages/api/**: API endpoints for authentication (login.ts, logout.ts)
- **src/utils/**: Shared utilities (auth.ts for centralized authentication logic)
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

The project implements session-based authentication using Astro's native session support:

- **Login**: `/login` - Password-protected login form (password: "1")
- **Protected Routes**: `/projects/*` - Requires valid session to access
- **Session Storage**: Filesystem-based sessions via Node.js adapter
- **API Endpoints**:
  - `POST /api/login` - Validates password and creates session
  - `POST /api/logout` - Destroys session and redirects to home

### Authentication Flow:
1. User visits protected route (e.g., `/projects/project2`) without session → redirected to `/login?redirect=%2Fprojects%2Fproject2`
2. User enters correct password → session created → redirected back to original destination
3. User can access protected routes while session is valid (1-day TTL)
4. User clicks logout → session destroyed → redirected to home

### New Features:
- **Redirect-after-login**: Users return to their originally requested page after authentication
- **Centralized auth utility**: `src/utils/auth.ts` provides reusable authentication logic
- **Session expiration detection**: Differentiates between expired sessions and no login attempts
- **Enhanced logging**: Detailed console messages for authentication events
- **Multiple protected routes**: Both `/projects/` and `/projects/project2` are protected

### Technical Implementation:

**Session Management:**
- Astro automatically creates HTTP-only session cookies on first `session.set()`
- Session ID (UUID) stored in cookie, actual data stored server-side
- Session files stored in `node_modules/.astro/sessions/[session-id]`
- Cookie automatically included in subsequent browser requests

**Login Process (POST /api/login):**
- Form data extracted and password validated (hardcoded as "1")
- On success: `session.set()` creates session with `authenticated: true` and `loginTime`
- Response: 302 redirect to `/projects` with session cookie set
- On failure: 302 redirect to `/login?error=invalid`

**Logout Process (POST /api/logout):**
- `session.destroy()` deletes session file from server
- Browser cookie becomes invalid (points to non-existent session)
- Response: 302 redirect to `/` (homepage)

**Route Protection (via src/utils/auth.ts):**
- Protected pages import and call `checkAuthentication(Astro)`
- Function checks session and handles cookie expiration detection
- If not authenticated: 302 redirect to `/login?redirect=<current-path>`
- If authenticated: Returns auth data (login time, current time)
- Centralized logic ensures consistent behavior across all protected routes

### Session Data:
- `authenticated`: boolean flag indicating login status
- `loginTime`: ISO timestamp of when user logged in

### Session Configuration:
- **TTL (Time To Live)**: 86400 seconds (1 day) configured in `astro.config.mjs`
- **Storage Location**: `node_modules/.astro/sessions/[session-id]`
- **Cookie Security**: HTTP-only, automatically managed by Astro

## Deployment

Configured for Render.com deployment as a web service:
- **Start Command**: `pnpm start` (runs `node ./dist/server/entry.mjs`)
- **Build Output**: Server bundle in `dist/server/`
- **Port**: Uses `process.env.PORT` or defaults to 10000
- **Host**: Binds to `0.0.0.0` for external traffic

The codebase follows Astro's file-based routing where pages in `src/pages/` become routes. Components use Astro's syntax with frontmatter for server-side logic and JSX-like templates for markup.