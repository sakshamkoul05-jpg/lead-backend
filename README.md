# Smart Leads Backend

REST API for the Smart Leads Dashboard built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- express-validator

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable       | Description                     |
|----------------|---------------------------------|
| PORT           | Server port (default: 5000)     |
| MONGO_URI      | MongoDB connection string        |
| JWT_SECRET     | Secret key for JWT tokens        |
| JWT_EXPIRES_IN | Token expiry (default: 7d)       |
| FRONTEND_URL   | Allowed CORS origin              |

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## API Documentation

### Auth Endpoints

| Method | Endpoint            | Description        | Auth Required |
|--------|---------------------|--------------------|---------------|
| POST   | /api/auth/register  | Register new user  | No            |
| POST   | /api/auth/login     | Login user         | No            |
| GET    | /api/auth/profile   | Get current user   | Yes           |

### Lead Endpoints

| Method | Endpoint        | Description     | Auth Required |
|--------|-----------------|-----------------|---------------|
| GET    | /api/leads      | Get all leads   | Yes           |
| GET    | /api/leads/:id  | Get single lead | Yes           |
| POST   | /api/leads      | Create lead     | Yes           |
| PUT    | /api/leads/:id  | Update lead     | Yes           |
| DELETE | /api/leads/:id  | Delete lead     | Yes           |

### Query Parameters for GET /api/leads

| Param   | Type   | Description                          |
|---------|--------|--------------------------------------|
| page    | number | Page number (default: 1)             |
| limit   | number | Records per page (default: 10)       |
| status  | string | Filter: New, Contacted, Qualified, Lost |
| source  | string | Filter: Website, Instagram, Referral |
| search  | string | Search by name or email              |
| sort    | string | latest or oldest (default: latest)   |

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "optional message"
}
```

## Docker

```bash
docker build -t smart-leads-backend .
docker run -p 5000:5000 --env-file .env smart-leads-backend
```

## Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repo to Render or Railway
3. Set environment variables
4. Deploy
