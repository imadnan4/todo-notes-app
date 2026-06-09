# Notes App

Simple notes/todo app with separate `backend` and `frontend` folders.

## Backend

- Language: Node.js (ES Modules)
- Server entry: `src/server.js`

### Quick start

```bash
cd backend
npm install
# or to install specific deps used by this project:
npm install express mongoose dotenv cors bcryptjs jsonwebtoken && npm install -D nodemon

# copy environment template
cp .env.template .env
# open .env and set MONGO_URI and JWT_SECRET

# start in development
npm run dev
```

## Environment

Copy `.env.template` to `.env` and set values for:

- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — optional server port (default 5000)

## What I changed / created

- Added this `README.md` with setup steps.
- Added a `.gitignore` (see repository root).

## Next steps

- Implement routes/controllers in `backend/controllers` and `backend/routes`.
- Run the backend and verify `/api/health`.
