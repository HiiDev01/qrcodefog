import { requireStripe } from '../config/stripe.js';
import { AppError } from '../utils/AppError.js';
import { checkoutSchema } from '../validators/billing.js';
import { getBillingState, createCheckoutSession, createPortalSession, processWebhookEvent } from '../services/billingService.js';

export async function status(req, res) {
  res.json(await getBillingState(req.user.id));
}

export async function checkout(req, res) {
  const { plan } = checkoutSchema.parse(req.body);
  res.json(await createCheckoutSession(req.user, plan));
}

export async function portal(req, res) {
  res.json(await createPortalSession(req.user.id));
}

// Stripe calls this directly. req.body is the RAW buffer (see app.js) so the signature can be verified.
export async function handleWebhook(req, res) {
  const stripe = requireStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new AppError(503, 'Webhook secret is not configured.');
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.get('stripe-signature'), secret);
  } catch {
    return res.status(400).send('Invalid signature.');
  }
  await processWebhookEvent(event); // a thrown error returns 500 so Stripe retries
  res.json({ received: true });
}
