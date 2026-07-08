# Outdoor Reflections

Outdoor Reflections is an offline-first journaling app for capturing a day as both text and drawing. It pairs a lightweight writing experience with a sketch surface, then syncs entries back to the server when the connection is available.

This is the project I would point an interviewer to if I wanted to show how I approach product thinking, UI state, offline persistence, and backend reconciliation in one small codebase.

## What It Does

- **Write and sketch in one entry** - each reflection combines a title, structured text blocks, and a hand-drawn canvas.
- **Works offline first** - journal data is stored locally in IndexedDB so the app remains usable without a network connection.
- **Syncs when online** - a NestJS backend handles authentication, reflection storage, and reconciliation with PostgreSQL.
- **Feels intentionally drawn** - icons are rendered as freehand strokes so the interface matches the product idea instead of looking like a generic notes app.

## Technical Highlights

- **Offline-first persistence** - entries are written to IndexedDB so the app continues to work even when the backend is unavailable.
- **Mixed media editing** - the editor treats text blocks and drawing strokes as part of the same reflection, which makes layout and state handling more interesting than a standard notes app.
- **Autosave without blocking the UI** - changes are saved in the background after input settles, so the editor stays responsive.
- **Freehand rendering** - icons and drawing strokes use `perfect-freehand` instead of static SVG shapes, which keeps the UI visually consistent with the product idea.
- **Server reconciliation** - the backend accepts locally created reflections and upserts them into PostgreSQL so the sync path can handle reconnects and retries.

## Syncing Challenge

The hardest part of the project is synchronising entries cleanly.

Each reflection can be created or edited offline, then changed again before the device reconnects. That means the app has to treat the browser copy as the working source of truth until sync completes, then reconcile it with the server without losing drawings, text edits, or ordering changes. The sync flow has to handle:

- local writes arriving before any network request
- reconnects after multiple offline edits
- preserving the full reflection payload, including drawings stored as path data
- keeping the UI usable while sync is happening in the background


## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion |
| Drawing | perfect-freehand, svg-path-properties |
| Local storage | IndexedDB |
| Backend | NestJS 11, PostgreSQL, Passport, JWT |
| Styling | Tailwind CSS, custom font treatment, runtime freehand icons |

## Project Tour

If you only read a few files, start here:

- `frontend/components/EntryEditor.tsx` - main editor flow, autosave, drawing/text mode switching, and layout.
- `frontend/components/TextArea.tsx` - block-based text editor built on Motion Reorder.
- `frontend/components/DrawingArea.tsx` - SVG drawing surface with freehand stroke generation.
- `frontend/components/DrawIcon.tsx` - turns icon paths into sketched strokes at render time.
- `frontend/lib/database.ts` - IndexedDB wrapper for offline persistence.
- `backend/src/reflections/` - reflection storage, sync, and service logic.
- `backend/src/auth/` - JWT/local auth flow.
- `backend/src/database/schema.sql` - PostgreSQL schema for users and reflections.

## Repository Layout

```text
outdoor-reflections/
├── frontend/   Next.js app with the editor, local persistence, and UI
└── backend/    NestJS API with auth, reflection storage, sync, and database access
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Apply `backend/src/database/schema.sql` to your PostgreSQL database before the first run. Environment variables are read through `@nestjs/config`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

## Testing

```bash
cd backend
npm test
npm run test:e2e
```

## Notes

- The current build is designed to be practical to run locally rather than polished as a public product.
- The strongest part of the repo is the editor workflow itself: autosave, offline persistence, drawing, and sync are all implemented in a way that is easy to inspect and discuss.
