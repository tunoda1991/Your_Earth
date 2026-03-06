-- Add category column to posts
alter table public.posts
  add column if not exists category text default 'nature' not null;

-- Index for filtering
create index if not exists posts_category_idx on public.posts(category);

-- Add name column to profiles (used by Your Earth app)  
alter table public.profiles
  add column if not exists name text;

update public.profiles set name = username where name is null;
