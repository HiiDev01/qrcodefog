// Plan limits: the single source of truth. Edit the numbers freely (they are placeholders).
export const PLAN_LIMITS = {
  free: { maxSaved: 5, maxDynamic: 0, formats: ['png'], advanced: false },
  pro: { maxSaved: 200, maxDynamic: 50, formats: ['png', 'jpeg', 'svg'], advanced: true },
  business: { maxSaved: 5000, maxDynamic: 1000, formats: ['png', 'jpeg', 'svg'], advanced: true },
};
export const limitsFor = (plan) => PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
