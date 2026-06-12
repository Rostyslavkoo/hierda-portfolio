-- Adds a thumb_url column to every image table.
-- Run this in the Supabase Dashboard → SQL Editor.

alter table photos    add column if not exists thumb_url text;
alter table digitals  add column if not exists thumb_url text;
alter table paintings add column if not exists thumb_url text;

-- For existing rows that have no thumbnail yet, fall back to the full image so
-- the site keeps working until they are re-uploaded / re-optimised.
update photos    set thumb_url = url where thumb_url is null;
update digitals  set thumb_url = url where thumb_url is null;
update paintings set thumb_url = url where thumb_url is null;
