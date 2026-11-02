import { supabaseAdmin as db } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';
import { limitsFor } from '../config/plans.js';

const PROFILE_COLS = 'id, plan, stripe_customer_id, subscription_status, current_period_end, cancel_at_period_end';

export async function getProfileBilling(userId) {
  const { data, error } = await db.from('profiles').select(PROFILE_COLS).eq('id', userId).maybeSingle();
  if (error) throw error;
  if (!data) throw new AppError(404, 'Profile not found.');
  return data;
}

const count = (q) => q.then(({ count: c, error }) => { if (error) throw error; return c ?? 0; });

export async function getUsage(userId) {
  const [saved, dynamic] = await Promise.all([
    count(db.from('qr_codes').select('id', { count: 'exact', head: true }).eq('user_id', userId)),
    count(db.from('qr_codes').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('qr_type', 'dynamic')),
  ]);
  return { saved, dynamic };
}

// Called before creating a QR code. Existing codes are never disabled when a plan lapses,
// so printed dynamic codes keep working; only NEW creation is limited.
export async function assertCanCreate(userId, { dynamic }) {
  const { plan } = await getProfileBilling(userId);
  const limits = limitsFor(plan);
  if (dynamic && limits.maxDynamic === 0) {
    throw new AppError(402, 'Dynamic QR codes are available on the Pro and Business plans.');
  }
  const usage = await getUsage(userId);
  if (usage.saved >= limits.maxSaved) {
    throw new AppError(402, `Your ${plan} plan allows ${limits.maxSaved} saved QR codes. Upgrade to save more.`);
  }
  if (dynamic && usage.dynamic >= limits.maxDynamic) {
    throw new AppError(402, `Your ${plan} plan allows ${limits.maxDynamic} dynamic QR codes. Upgrade to add more.`);
  }
}
