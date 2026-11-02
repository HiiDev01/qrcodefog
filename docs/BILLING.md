# Stripe billing setup

QRForge uses Stripe Checkout (hosted payment page) for subscriptions and the Stripe Billing Portal for upgrades, cancellations and card updates. Your server never sees card details.

## 1. Database
Run `supabase/migration_003_billing.sql` in the Supabase SQL Editor. It also stops users from editing their own plan from the browser.

## 2. Stripe dashboard (use Test mode first)
1. **Products**: create "QRForge Pro" and "QRForge Business", each with a **monthly recurring** price (the page shows $9 and $29; edit `frontend/src/utils/plans.js` to match whatever you charge). Copy each **Price ID** (`price_...`).
2. **Billing Portal**: Settings > Billing > Customer portal. Turn it on and allow cancelling and updating payment methods.
3. **Webhook**: Developers > Webhooks > Add endpoint:
   - URL: `https://YOUR-API/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the **Signing secret** (`whsec_...`).
4. **API keys**: copy the secret key (`sk_test_...`).

## 3. Backend environment
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...
```
Run `npm install` in `backend` (adds the `stripe` package) and restart. Without these variables the app still runs and billing answers "not configured".

## 4. Test locally
```bash
stripe listen --forward-to localhost:4000/api/billing/webhook   # prints a whsec_ for local .env
```
Log in, open Pricing, click Get Pro, pay with card `4242 4242 4242 4242` (any future date, any CVC). You return to the dashboard and the plan switches to Pro within a few seconds.

## Plan limits
Edit `backend/src/config/plans.js` (the numbers are placeholders) and keep `FREE_LIMITS` in `frontend/src/utils/plans.js` in sync.
- Enforced on the server: saved QR count, dynamic QR count, dynamic availability.
- Enforced in the interface only: JPEG/SVG downloads, custom colors and logos (these run in the browser).
- If a plan lapses, existing QR codes keep working (printed dynamic codes do not break); only creating new ones is limited.

## Going live
Switch to live keys, create the live products, prices and webhook, and update the four environment variables on your API host.
