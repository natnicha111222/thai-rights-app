# สิทธิคนไทย (Thai Rights App)

A web app that helps Thai citizens discover government welfare benefits and entitlements they qualify for based on their personal profile.

## Features

- **Profile-based filtering** — enter age, gender, employment status, and other conditions to get a personalized list of applicable rights
- **Browse all rights** — explore the full catalog filtered by category
- **Timeline view** — see rights organized by life stage
- **Chatbot (น้องสิทธิ์)** — floating chat assistant that answers questions about specific benefits

## Getting Started

Both servers must run simultaneously.

**Backend** (port 5000):
```bash
cd backend
npm install
node server.js
```

**Frontend** (port 3000):
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend:** React 17 (Create React App)
- **Backend:** Node.js + Express
- **Data:** Static JS file (`backend/data.js`) — no database

## Project Structure

```
thai-rights-app/
├── backend/
│   ├── server.js    # Express API server
│   └── data.js      # All rights, categories, and chatbot responses
└── frontend/
    └── src/
        ├── App.js              # Root component and state management
        └── components/
            ├── Home.js
            ├── Profile.js
            ├── MyRights.js
            ├── AllRights.js
            ├── Timeline.js
            ├── RightModal.js
            └── Chatbot.js
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/rights` | All rights and categories |
| GET | `/api/rights/:id` | Single right by ID |
| POST | `/api/rights/filter` | Filter rights by user profile |
| POST | `/api/chat` | Chatbot keyword response |
