# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**สิทธิคนไทย** — A Thai welfare rights web app helping Thai citizens discover government benefits and entitlements they qualify for.

## Architecture

Two independent Node.js packages with no shared root:

```
thai-rights-app/
├── backend/    # Express.js API server (port 5000)
└── frontend/   # React 17 (Create React App) SPA
```

### Backend (`backend/`)

- `server.js` — Express server with 6 routes (no npm start script; run with `node server.js`)
- `data.js` — Static data source: exports `rights[]`, `categories[]`, and `chatResponses{}`
- `users.json` — Auto-generated file storing saved user profiles (gitignored)

**API endpoints:**
- `GET /api/rights` — returns all rights + categories
- `GET /api/rights/:id` — single right by ID
- `POST /api/rights/filter` — filters rights by user profile fields (age, gender, work, isDisabled, isPregnant, isVeteran, hasChildren, isLowIncome)
- `POST /api/chat` — keyword-based chatbot; matches against `chatResponses` keys first, then right names/descriptions
- `GET /api/users` — returns all saved user profiles
- `POST /api/users` — saves or updates a user profile by name; body: `{ name, ...profileFields }`

**Right data shape:** `{ id, name, description, category, icon, ageMin, ageMax, conditions[], howTo, contact, phone, location, documents }`

Filtering logic: age range check + `conditions[]` must intersect with user's applicable conditions (work status or boolean flags mapped to strings like `"disabled"`, `"pregnant"`, `"employee"`, etc.).

### Frontend (`frontend/`)

- `src/App.js` — Single root component holding all application state: `page`, `rights`, `categories`, `myRights`, `profile`, `selectedRight`, `menuOpen`
- Navigation is manual page-state switching (no react-router); pages: `home`, `profile`, `myRights`, `timeline`, `allRights`
- API base URL hardcoded to `http://localhost:5000/api` in both `App.js` and `Chatbot.js`
- `RightModal` and `Chatbot` are overlays rendered at the App root level
- Mobile hamburger menu controlled by `menuOpen` state in App.js; renders `.mobile-menu` dropdown below navbar

**Component responsibilities:**
- `Home` — search bar + stats + entry point to Profile
- `Profile` — form collecting user demographics + name field; loads saved profiles from `/api/users` on mount; selecting a saved profile auto-fills the form; on submit saves profile to backend then calls `filterRights()` in App, navigating to `myRights`
- `MyRights` — shows filtered rights for the user's profile
- `AllRights` — full list with category filter + horizontal-scroll filter tabs on mobile
- `Timeline` — displays rights grouped or ordered by life stage/age
- `RightModal` — detail overlay for a selected right
- `Chatbot` — floating chat widget ("น้องสิทธิ์"); sends messages to `/api/chat`

## Styling

- All styles in `frontend/src/App.css` — no CSS modules or styled-components
- Color palette: navy `#003087` (primary), gold `#f5c518` (accent), light gray `#e8eef5` (background)
- Background uses a dot pattern via `radial-gradient` for a formal Thai government look
- Responsive breakpoints: 768px (tablet), 650px (mobile — hamburger menu appears), 400px (small mobile)
- Font: `Prompt` (Google Fonts, loaded via `public/index.html`)

## Development Commands

**Backend:**
```bash
cd backend
node server.js          # starts on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm start               # starts dev server on http://localhost:3000
npm run build           # production build
```

Run `npm install` only on first run or after `package.json` changes. Both servers must run simultaneously during development.

## Key Conventions

- All welfare rights data lives exclusively in `backend/data.js`. Adding new rights or modifying existing ones is done there.
- The `conditions` field in each right uses string identifiers (`"employee"`, `"disabled"`, `"pregnant"`, `"veteran"`, `"hasChildren"`, `"lowIncome"`, `"male"`, `"female"`) that must match what the filter endpoint constructs from the user profile POST body.
- There are no tests configured in either package.

## Planned Features (Not Yet Implemented)

- บันทึกสิทธิ์โปรด (Favorites/Bookmarks)
- Checklist การยื่นขอสิทธิ์ (track applied rights)
- ปุ่มแชร์สิทธิ์ (Share button)
- คำนวณเงินที่จะได้รับ (Benefits calculator)
