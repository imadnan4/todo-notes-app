# Notes App

A full-stack notes application. Users can register, log in, and manage personal notes with titles, content, and tags.

## Stack

- **Backend** — Node.js, Express 5, MongoDB, JWT auth → [`backend/`](./backend/README.md)
- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui → [`frontend/`](./frontend/README.md)

## Prerequisites

- Node.js v18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

## Quick Start

```bash
# 1. Start the backend
cd backend && npm install && cp .env.template .env
# fill in MONGO_URI and JWT_SECRET in .env
npm run dev

# 2. Start the frontend (new terminal)
cd frontend && npm install && npm run dev
```

- API: `http://localhost:5000`
- App: `http://localhost:5173`
