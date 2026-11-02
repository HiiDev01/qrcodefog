const ACTIVE = new Set(['active', 'trialing', 'past_due']); // past_due keeps access while Stripe retries payment

// Pure function: Stripe subscription -> the profile columns we store.
export function subscriptionToPatch(sub, priceIds) {
  const item = sub.items?.data?.[0];
  const paidPlan = Object.entries(priceIds).find(([, id]) => id && id === item?.price?.id)?.[0] ?? null;
  // Newer Stripe API versions moved current_period_end onto the subscription item.
  const end = sub.current_period_end ?? item?.current_period_end ?? null;
  return {
    plan: ACTIVE.has(sub.status) && paidPlan ? paidPlan : 'free',
    stripe_subscription_id: sub.id,
    subscription_status: sub.status,
    current_period_end: end ? new Date(end * 1000).toISOString() : null,
    cancel_at_period_end: Boolean(sub.cancel_at_period_end || sub.cancel_at),
  };
}
