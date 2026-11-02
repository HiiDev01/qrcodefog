-- Billing columns. Run after migration_002_storage.sql.
alter table public.profiles
  add column plan text not null default 'free' check (plan in ('free', 'pro', 'business')),
  add column stripe_customer_id text unique,
  add column stripe_subscription_id text,
  add column subscription_status text,
  add column current_period_end timestamptz,
  add column cancel_at_period_end boolean not null default false;

-- IMPORTANT: users must not be able to upgrade themselves. The earlier RLS policy let a user update
-- their own profile row, so restrict which columns the browser (anon/authenticated roles) may change.
revoke update on public.profiles from anon, authenticated;
grant update (full_name) on public.profiles to authenticated;
-- Plan columns are written only by the backend (service role) from verified Stripe webhooks.
