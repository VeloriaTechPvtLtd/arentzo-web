-- Harden waitlist: remove public SELECT so anon key cannot dump emails.
-- Admins read via Supabase dashboard / service role only.
drop policy if exists "Allow anon select own waitlist email" on public.waitlist_signups;
