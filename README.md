# Outdoor Reflections

An offline-first hiking journal for capturing trail memories — write entries, sketch what you saw, and sync when you're back in range.

## What it does

- **Write & sketch reflections** — each journal entry combines a title, free-form text, and a hand-drawn sketch surface powered by [perfect-freehand](https://github.com/steveruizok/perfect-freehand).
- **Works offline first** — entries are persisted to the browser's IndexedDB the moment you stop typing, so the app is usable on the trail without a connection.
- **Syncs when online** — a NestJS backend exposes a `/reflection/sync` endpoint that reconciles local entries with PostgreSQL once the device reconnects.
- **Hand-drawn UI** — sidebar icons are rendered as freehand strokes (not static SVGs) so the whole interface feels sketched rather than rigid.

## Tech stack

| Layer       | Stack                                                                            |
|-------------|----------------------------------------------------------------------------------|
| Frontend    | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, shadcn/ui |
| Drawing     | perfect-freehand, svg-path-properties                                            |
| Offline     | IndexedDB                                                                        |
| Backend     | NestJS 11, PostgreSQL (`pg`)                                                     |
| Auth        | Passport (JWT + local), bcryptjs                                                 |

## Repository layout

```
outdoor-reflections/
├── frontend/   Next.js app — journal UI, drawing canvas, IndexedDB layer
└── backend/    NestJS API — auth, reflections CRUD, sync endpoint, Postgres schema
```

Notable pieces:

- `frontend/components/EntryEditor.tsx` — the entry composer (text + drawing modes, undo/redo, autosave).
- `frontend/components/DrawIcon.tsx` — turns SVG paths into freehand strokes at render time.
- `frontend/components/SideBar.tsx` — collapsing animated navigation built from reusable `SidebarItem` and `AnimatedLabel` primitives.
- `frontend/lib/database.ts` — IndexedDB wrapper used for offline persistence.
- `backend/src/reflections/` — controller, service, repository, and `sync.service.ts` for batch reconciliation.
- `backend/src/database/schema.sql` — `user_account` and `reflection` tables (UUID-keyed reflections with `drawing_paths` stored as JSONB).

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL (any recent version)

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Apply the schema in `backend/src/database/schema.sql` to your Postgres database before first run. Database connection settings are read via `@nestjs/config` — provide them through environment variables.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

## Tests

```bash
cd backend
npm test          # unit
npm run test:e2e  # e2e
```
