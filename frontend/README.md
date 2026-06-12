# Frontend

React + TypeScript SPA for the Notes App. Communicates with the Express backend via a Vite dev proxy.

## Tech Stack

- **Framework** — React 19, TypeScript
- **Build tool** — Vite 8
- **Styling** — Tailwind CSS v4
- **Components** — shadcn/ui (Radix UI primitives)
- **Routing** — react-router-dom v7
- **HTTP** — Axios (with JWT interceptors)
- **Notifications** — Sonner (toasts)
- **Icons** — Tabler Icons
- **Font** — Geist (variable)
- **Formatting / Linting** — Prettier, ESLint

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.ts          # Axios instance — attaches JWT on requests,
│   │   │                     # redirects to /login on 401 responses
│   │   ├── auth.ts           # registerUser(), loginUser()
│   │   └── notes.ts          # getNotes(), createNote(), updateNote(), deleteNote()
│   ├── components/
│   │   ├── ui/               # shadcn/ui generated components (Button, Input, etc.)
│   │   ├── Navbar.tsx        # Top bar with user info and logout button
│   │   ├── NoteCard.tsx      # Note card with edit and delete actions
│   │   ├── PrivateRoute.tsx  # Redirects unauthenticated users to /login
│   │   └── theme-provider.tsx
│   ├── context/
│   │   └── AuthContext.tsx   # Auth state: user, token, login(), register(), logout()
│   ├── hooks/
│   │   └── useNotes.ts       # Notes CRUD hook — fetches on mount, updates local state,
│   │                         # shows success/error toasts
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx # Note creation form + responsive notes grid
│   ├── App.tsx               # BrowserRouter, AuthProvider, route definitions
│   ├── main.tsx
│   └── index.css
├── index.html
└── vite.config.ts            # Proxy: /api → http://localhost:5000, @ alias → ./src
```

## Quick Start

Make sure the backend is running on `http://localhost:5000` first.

```bash
npm install
npm run dev
```

The app will be at `http://localhost:5173`. Vite proxies all `/api/*` requests to the backend, so no CORS setup or manual API URL is needed in development.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format `.ts`/`.tsx` files with Prettier |
| `npm run typecheck` | Run TypeScript without emitting files |

## Routes

| Path | Component | Access |
|---|---|---|
| `/` | Redirects to `/dashboard` | — |
| `/login` | `LoginPage` | Public |
| `/register` | `RegisterPage` | Public |
| `/dashboard` | `DashboardPage` | Protected |

## Auth Flow

1. Login/register form → `AuthContext` calls the API and stores `token` + `user` in state and `localStorage`.
2. Every Axios request automatically gets `Authorization: Bearer <token>` attached.
3. Any `401` response clears storage and redirects to `/login`.
4. `PrivateRoute` checks `isAuthenticated`; unauthenticated users are sent to `/login`.
