create table if not exists public.reactions (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  reaction_type text not null check (reaction_type in ('like', 'love', 'fire', 'eco', 'wow', 'sad')),
  created_at timestamptz default now() not null,
  unique (post_id, user_id)
);

alter table public.reactions enable row level security;

create policy "Anyone can read reactions"
  on public.reactions for select
  using (true);

create policy "Authenticated users can add reactions"
  on public.reactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reactions"
  on public.reactions for update
  using (auth.uid() = user_id);

create policy "Users can remove their own reactions"
  on public.reactions for delete
  using (auth.uid() = user_id);
