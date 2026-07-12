-- Waitlist emails captured from the landing page
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'landing',
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

-- Allow anonymous inserts from the marketing site (idempotent)
drop policy if exists "Allow anon insert waitlist" on public.waitlist_signups;
create policy "Allow anon insert waitlist"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

-- No public SELECT: waitlist emails are readable only via service role / dashboard.
drop policy if exists "Allow anon select own waitlist email" on public.waitlist_signups;
