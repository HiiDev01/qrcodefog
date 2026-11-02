import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { checkSupabaseEnv } from './checkEnv.js';

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables. Copy .env.example to .env.');
}
checkSupabaseEnv({ url: SUPABASE_URL, anon: SUPABASE_ANON_KEY, service: SUPABASE_SERVICE_ROLE_KEY })
  .forEach((w) => console.warn(`[config] ${w}`));

const opts = { auth: { persistSession: false, autoRefreshToken: false } };

// Used only for sign-up / sign-in calls.
export const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, opts);
// Service role: bypasses RLS. Server-side only, so ownership checks are done in code.
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, opts);
