-- Billing columns. Run after migration_002_storage.sql.
alter table public.profiles
  add column plan text not null default 'free' check (plan in ('free', 'pro', 'business')),
  add column stripe_customer_id text unique,
  add column stripe_subscription_id text,
  add column subscription_status text,
  add column current_period_end timestamptz,
  add column cancel_at_period_end boolean not null default false;

-- IMPORTANT: users can  not be able to upgrade themselves.
revoke update on public.profiles from anon, authenticated;
grant update (full_name) on public.profiles to authenticated;

