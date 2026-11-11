-- ========================================================
-- RevisionReel: Supabase Database Schema
-- Class 11-12 Board & JEE Foundation Micro-Learning
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES & USER PROGRESSION
create table if not exists public.profiles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade unique,
    username text unique,
    display_name text,
    avatar_url text,
    xp_points integer default 0,
    current_streak integer default 1,
    longest_streak integer default 1,
    last_active_date date default current_date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. COMPLETED CARDS & QUIZZES
create table if not exists public.completed_cards (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade not null,
    card_id text not null,
    subject text not null,
    score integer default 10,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, card_id)
);

-- 3. SAVED CARDS / BOOKMARKS
create table if not exists public.saved_cards (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade not null,
    card_id text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, card_id)
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
alter table public.profiles enable row level security;
alter table public.completed_cards enable row level security;
alter table public.saved_cards enable row level security;

-- Profiles: users can read & update their own profile
create policy "Allow user to view own profile"
    on public.profiles for select
    using (auth.uid() = user_id);

create policy "Allow user to update own profile"
    on public.profiles for update
    using (auth.uid() = user_id);

create policy "Allow user to insert own profile"
    on public.profiles for insert
    with check (auth.uid() = user_id);

-- Completed Cards: users can view & insert their own completions
create policy "Allow user to view own completed cards"
    on public.completed_cards for select
    using (auth.uid() = user_id);

create policy "Allow user to insert own completed cards"
    on public.completed_cards for insert
    with check (auth.uid() = user_id);

-- Saved Cards: users can view, insert, delete their own bookmarks
create policy "Allow user to view own saved cards"
    on public.saved_cards for select
    using (auth.uid() = user_id);

create policy "Allow user to insert own saved cards"
    on public.saved_cards for insert
    with check (auth.uid() = user_id);

create policy "Allow user to delete own saved cards"
    on public.saved_cards for delete
    using (auth.uid() = user_id);

-- ========================================================
-- TRIGGER: Automatically create profile on new user signup
-- ========================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (user_id, display_name, xp_points, current_streak, longest_streak)
    values (new.id, split_part(new.email, '@', 1), 0, 1, 1);
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
