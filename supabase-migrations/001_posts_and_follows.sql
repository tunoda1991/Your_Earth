create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  image_url text,
  link_url text,
  created_at timestamptz default now() not null
);

alter table public.posts enable row level security;

create policy "Anyone can read posts"
  on public.posts for select
  using (true);

create policy "Authenticated users can insert posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own posts"
  on public.posts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

create table if not exists public.follows (
  follower_id uuid references auth.users(id) on delete cascade not null,
  following_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  primary key (follower_id, following_id)
);

alter table public.follows enable row level security;

create policy "Anyone can read follows"
  on public.follows for select
  using (true);

create policy "Authenticated users can follow"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "Users can unfollow"
  on public.follows for delete
  using (auth.uid() = follower_id);

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "Anyone can view post images"
  on storage.objects for select
  using (bucket_id = 'post-images');

create policy "Authenticated users can upload post images"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and auth.role() = 'authenticated');
