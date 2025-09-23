# Auth Test Astro Session

An Astro project demonstrating session-based authentication with server-side rendering (SSR).

## ✨ Features

- **Session-based Authentication** using Astro's built-in session API
- **Protected Routes** with automatic login redirects
- **Server-Side Rendering** with Node.js adapter
- **Filesystem Session Storage** for persistence
- **Simple Console Logging** for authentication events
- **Production-ready** deployment configuration for Render.com

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── *.svg
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── api/
│   │   │   ├── login.ts      # Login API endpoint
│   │   │   └── logout.ts     # Logout API endpoint
│   │   ├── projects/
│   │   │   └── index.astro   # Protected route
│   │   ├── index.astro       # Homepage
│   │   └── login.astro       # Login form
└── package.json
```

## 🔐 Authentication

The project implements session-based authentication:

### Login
- Visit `/login` to access the login form
- Default password: `1`
- Successful login creates a server-side session
- Redirects to `/projects` after authentication

### Protected Routes
- All routes under `/projects/*` require authentication
- Unauthenticated users are redirected to `/login`
- Session data persists across requests

### Logout
- Click "Logout" button on protected pages
- Destroys server-side session
- Redirects to homepage

### Session Storage
- Uses Astro's built-in filesystem session storage
- Sessions stored in `node_modules/.astro/sessions/`
- No external database required

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at localhost:10000 |
| `pnpm build` | Build for production to ./dist/ |
| `pnpm preview` | Preview production build locally |
| `pnpm start` | Start production server (runs built application) |
| `pnpm astro ...` | Run Astro CLI commands |

## 🚀 Deployment

### Render.com Configuration

This project is configured for deployment on Render.com:

- **Build Command**: `pnpm install --frozen-lockfile; pnpm run build`
- **Start Command**: `pnpm start`
- **Environment Variables**:
  - `NODE_VERSION`: `v20.3.0` (or higher)

### Server Configuration

- **Port**: Uses `process.env.PORT` or defaults to 10000
- **Host**: Binds to `0.0.0.0` for external traffic
- **Node.js Adapter**: Standalone mode for container deployment

## 🛠️ Technology Stack

- **Framework**: Astro v5.13.10 with SSR
- **Runtime**: Node.js (>=18.0.0)
- **Package Manager**: pnpm
- **Authentication**: Astro Sessions API
- **Deployment**: Render.com
- **TypeScript**: Strict configuration

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [Astro Sessions Guide](https://docs.astro.build/en/guides/sessions/)
- [Node.js Adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
- [Astro Discord](https://astro.build/chat)