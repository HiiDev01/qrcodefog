-- QRForge schema. Run in Supabase: SQL Editor > New query > paste > Run.
create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  destination_type text not null check (destination_type in
    ('url','email','vcard','message','phone','wifi','crypto','text')),
  original_url text not null,
  qr_type text not null default 'static' check (qr_type in ('static','dynamic')),
  short_code text unique check (short_code ~ '^[A-Za-z0-9]{6,12}$'),
  foreground_color text not null default '#111111' check (foreground_color ~ '^#[0-9a-fA-F]{6}$'),
  background_color text not null default '#ffffff' check (background_color ~ '^#[0-9a-fA-F]{6}$'),
  pattern text not null default 'square' check (pattern in ('square','dots','rounded')),
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (qr_type = 'static' or short_code is not null)
);
create index qr_codes_user_idx on public.qr_codes (user_id, created_at desc);
create index qr_codes_type_idx on public.qr_codes (user_id, destination_type);

create table public.qr_scans (
  id uuid primary key default gen_random_uuid(),
  qr_code_id uuid not null references public.qr_codes(id) on delete cascade,
  scanned_at timestamptz not null default now(),
  device_type text check (device_type in ('mobile','tablet','desktop','other'))
);
create index qr_scans_qr_idx on public.qr_scans (qr_code_id, scanned_at desc);

-- Keep updated_at fresh
create function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger qr_codes_touch before update on public.qr_codes
  for each row execute function public.touch_updated_at();

-- Create a profile whenever someone signs up
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.qr_codes enable row level security;
alter table public.qr_scans enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

create policy "own qr select" on public.qr_codes for select using (auth.uid() = user_id);
create policy "own qr insert" on public.qr_codes for insert with check (auth.uid() = user_id);
create policy "own qr update" on public.qr_codes for update using (auth.uid() = user_id);
create policy "own qr delete" on public.qr_codes for delete using (auth.uid() = user_id);

-- Users can read scans of their own codes. Scans are inserted only by the backend (service role).
create policy "own scans select" on public.qr_scans for select using (
  exists (select 1 from public.qr_codes q where q.id = qr_code_id and q.user_id = auth.uid())
);
