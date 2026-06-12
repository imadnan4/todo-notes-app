# Backend

Node.js REST API for the Notes App. Handles authentication and per-user note management.

## Tech Stack

- **Runtime** — Node.js (ES Modules)
- **Framework** — Express 5
- **Database** — MongoDB via Mongoose
- **Auth** — JWT (7-day expiry), bcryptjs password hashing
- **Logging** — Morgan (dev mode)
- **Dev tooling** — nodemon

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection (Mongoose)
├── controllers/
│   ├── auth.controller.js    # register, login
│   └── notes.controller.js   # getNotes, createNote, getNote, updateNote, deleteNote
├── middleware/
│   ├── auth.middleware.js    # protect — verifies JWT and attaches req.user
│   └── error.middleware.js   # global error handler
├── models/
│   ├── Note.model.js         # title, content, tags[], user ref, timestamps
│   └── User.model.js         # name, email, password (hashed), comparePassword()
├── routes/
│   ├── auth.routes.js        # POST /api/auth/register & /login
│   └── notes.routes.js       # /api/notes — all routes behind protect middleware
└── src/
    ├── app.js                # Express app: middleware, routes, error handler
    └── server.js             # Entry point: loads env, connects DB, starts listener
```

## Setup

```bash
npm install
cp .env.template .env
# Edit .env — set MONGO_URI and JWT_SECRET
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | — (required) |
| `JWT_SECRET` | Secret used to sign and verify JWTs | — (required) |
| `PORT` | Port the server listens on | `5000` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (restarts on file changes) |
| `npm start` | Start with plain Node.js |

## API Reference

All `/api/notes` routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new account, returns JWT + user |
| `POST` | `/api/auth/login` | Log in, returns JWT + user |

**Request body:**
```json
// register
{ "name": "Adnan", "email": "test@example.com", "password": "secret123" }

// login
{ "email": "test@example.com", "password": "secret123" }
```

**Response (both):**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Adnan", "email": "test@example.com" }
}
```

### Notes (all protected)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Get all notes for the logged-in user |
| `POST` | `/api/notes` | Create a new note |
| `GET` | `/api/notes/:id` | Get a single note by ID |
| `PATCH` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note (returns 204) |

**Note shape:**
```json
{
  "_id": "...",
  "title": "My Note",
  "content": "Some content here",
  "tags": ["work", "ideas"],
  "createdAt": "2026-06-12T00:00:00.000Z",
  "updatedAt": "2026-06-12T00:00:00.000Z"
}
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns server status, uptime, and timestamp |

```json
{ "status": "ok", "timestamp": "...", "uptime": 42.3 }
```
