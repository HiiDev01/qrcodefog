# Deploying QRForge

Order matters: Supabase, then the API, then the frontend, then a final config pass.

## 1. Supabase
1. Create a project. In **SQL Editor** run `supabase/migration.sql`, then `supabase/migration_002_storage.sql`, then `supabase/migration_003_billing.sql`.
2. **Project Settings > API**: note the URL, anon key and service_role key.
3. Authentication URLs are set in step 4 once you know your Vercel URL.

## 2. Backend (Render, or Railway)
**Render:** New > Blueprint, pick this repo (it reads `render.yaml`), or create a Web Service manually with root directory `backend`, build `npm install`, start `npm start`, health check `/health`.

**Railway:** New project from repo, set the root directory to `backend`. Start command: `npm start`.

Environment variables:

| Name | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | from Supabase |
| `PUBLIC_BASE_URL` | the API's public URL, e.g. `https://qrforge-api.onrender.com` (no trailing slash) |
| `CLIENT_URL` | your Vercel URL, e.g. `https://qrforge.vercel.app` (exact origin, no trailing slash) |

For payments also add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PRO` and `STRIPE_PRICE_BUSINESS` (see `docs/BILLING.md`) and point the Stripe webhook at `https://YOUR-API/api/billing/webhook`.

Check `https://YOUR-API/health` returns `{"ok":true}`.

## 3. Frontend (Vercel)
Import the repo, set **Root Directory** to `frontend`. Framework preset: Vite (build `npm run build`, output `dist`). `vercel.json` makes page refreshes work with React Router.

Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL` (the API's public URL).

## 4. Final pass
- Supabase **Authentication > URL Configuration**: Site URL = your Vercel URL; add `https://YOUR-VERCEL-URL/reset-password` to Redirect URLs.
- If `CLIENT_URL` or `PUBLIC_BASE_URL` were guesses, correct them and redeploy the API.

## 5. Smoke test
1. Register, confirm your email if confirmation is on, log in.
2. Create a static QR and download PNG, JPEG and SVG.
3. Save a dynamic QR, open its short link: it should redirect and the scan should appear in analytics.
4. Edit the dynamic destination and open the link again.
5. Try the forgot-password email.

## Important notes
- **Pick the final API domain before printing codes.** Dynamic QR codes embed `PUBLIC_BASE_URL`. If that domain changes, existing printed codes break. Use a custom domain (for example `go.yourdomain.com`) for the API if you can.
- Render's free tier sleeps when idle, so the first scan after a quiet period can take 30+ seconds. Use a paid instance for real campaigns.
- The service_role key belongs only on the API host. Never add it to Vercel.
