import { supabaseAdmin as db } from '../config/supabase.js';
import { stripe, requireStripe, priceIds, billingEnabled } from '../config/stripe.js';
import { CLIENT_URL } from '../config/env.js';
import { limitsFor } from '../config/plans.js';
import { AppError } from '../utils/AppError.js';
import { subscriptionToPatch } from '../utils/subscription.js';
import { getProfileBilling, getUsage } from './planService.js';

export async function getBillingState(userId) {
  const [p, usage] = await Promise.all([getProfileBilling(userId), getUsage(userId)]);
  return {
    billingEnabled: billingEnabled(),
    plan: p.plan,
    limits: limitsFor(p.plan),
    usage,
    hasCustomer: Boolean(p.stripe_customer_id),
    subscription: {
      status: p.subscription_status,
      currentPeriodEnd: p.current_period_end,
      cancelAtPeriodEnd: p.cancel_at_period_end,
    },
  };
}

export async function createCheckoutSession(user, plan) {
  const s = requireStripe();
  const profile = await getProfileBilling(user.id);
  if (profile.plan !== 'free') {
    throw new AppError(409, 'You already have a paid plan. Use “Manage billing” to change or cancel it.');
  }
  // Create the Stripe customer first so every later webhook can be matched to this user.
  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    const c = await s.customers.create({ email: user.email, metadata: { user_id: user.id } });
    customerId = c.id;
    const { error } = await db.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id);
    if (error) throw error;
  }
  const session = await s.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: priceIds()[plan], quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: { metadata: { user_id: user.id } },
    success_url: `${CLIENT_URL}/dashboard?billing=success`,
    cancel_url: `${CLIENT_URL}/pricing?billing=cancelled`,
  });
  return { url: session.url };
}

export async function createPortalSession(userId) {
  const s = requireStripe();
  const { stripe_customer_id: customer } = await getProfileBilling(userId);
  if (!customer) throw new AppError(400, 'You do not have a billing account yet.');
  const session = await s.billingPortal.sessions.create({ customer, return_url: `${CLIENT_URL}/dashboard` });
  return { url: session.url };
}

async function applySubscription(sub) {
  const patch = subscriptionToPatch(sub, priceIds());
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  let { data, error } = await db.from('profiles').update(patch).eq('stripe_customer_id', customerId).select('id');
  if (error) throw error;
  if (!data?.length && sub.metadata?.user_id) {
    // Fallback if the customer id was not stored yet.
    ({ data, error } = await db.from('profiles')
      .update({ ...patch, stripe_customer_id: customerId }).eq('id', sub.metadata.user_id).select('id'));
    if (error) throw error;
  }
  if (!data?.length) console.warn(`[billing] no profile found for customer ${customerId}`);
}

// Webhook events can arrive out of order, so always re-read the latest subscription from Stripe.
export async function processWebhookEvent(event) {
  const obj = event.data.object;
  let subscriptionId = null;
  if (event.type.startsWith('customer.subscription.')) subscriptionId = obj.id;
  else if (event.type === 'checkout.session.completed') subscriptionId = obj.subscription;
  if (!subscriptionId) return;
  await applySubscription(await stripe.subscriptions.retrieve(subscriptionId));
}
