# QRForge

## Setup
1. Create a project at supabase.com. In **SQL Editor**, run `supabase/migration.sql`, then `supabase/migration_002_storage.sql` and `supabase/migration_003_billing.sql`.
2. In **Authentication > URL Configuration**, set Site URL to `http://localhost:5173` and add `http://localhost:5173/reset-password` as a redirect URL.
3. In **Project Settings > API**, copy the URL, anon key and service_role key.

```bash
# Backend
cd backend && cp .env.example .env   # fill in the keys
npm install && npm run dev           # http://localhost:4000/health

# Frontend (new terminal)
cd frontend && cp .env.example .env  # URL, anon key, API URL
npm install && npm run dev           # http://localhost:5173
```

Never put the service_role key in the frontend.

## Payments
Stripe subscriptions: see `docs/BILLING.md`.

## Status
Generator, auth, QR CRUD, dynamic QR + redirects, dashboard, analytics, landing page, pricing, FAQ.
See DEPLOYMENT.md to go live.

## Quick API check (after logging in, copy your access token)
```bash
curl -X POST localhost:4000/api/qr/save -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Test","destinationType":"url","content":"https://example.com","qrType":"dynamic"}'
# open the returned short_url in a browser: it should redirect to example.com
```

## Backend layout
```
backend/src
  server.js        starts the server        app.js   builds the Express app
  config/          env + Supabase clients
  routes/          URL -> controller wiring
  controllers/     parse request, call a service, send response
  services/        business logic and database queries (auth, qr, scan, analytics)
  validators/      Zod schemas
  middleware/      auth, rate limits, error handling
  utils/           small helpers (URL safety, short codes, logo paths, mappers)
```
