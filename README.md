# MRanalysis — Frontend

React dashboard for the MRanalysis platform. Consumes the FastAPI backend at `/api/v1`.

## Tech stack

- React 18 + Vite + TypeScript
- React Router — routing
- TanStack Query — API fetching and job status polling
- Recharts — charts
- Tailwind CSS — styling
- Zod + React Hook Form — form validation

## Prerequisites

- Node.js 20+
- Backend API running (see `github-analytics` repo)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at http://localhost:5173.

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api/v1` | Backend API base URL |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |

## Project structure

```
src/
├── api/           # API client and endpoint functions
├── components/    # Shared UI components
├── features/      # Feature modules (as app grows)
├── hooks/         # React hooks (auth context)
├── lib/           # Utilities (token storage, Zod schemas)
├── pages/         # Route pages
├── routes/        # React Router config
└── types/         # TypeScript API types
```

## Engineering standards

All contributors (including AI agents) must follow **`rules.md`** before adding or changing code — file size limits, module boundaries, TypeScript/React conventions, and API layer rules.

## Pages (Phase 7 scaffold)

- `/login`, `/register` — JWT auth
- `/` — dashboard: submit repo URL, list repositories
- `/repositories/:id` — detail view with status polling and charts

See `plan.md` for the full product roadmap.
