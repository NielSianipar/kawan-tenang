-- ============================================================
-- Schema: Platform Dukungan Kesehatan Mental untuk Gen Z
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- Tabel profil tambahan di luar auth.users bawaan Supabase
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  avatar_seed text default 'default',
  created_at timestamptz default now()
);

-- Hasil skrining (PHQ-9 / GAD-7 adaptasi ringan)
create table public.screening_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score int not null,
  category text not null check (category in ('rendah', 'sedang', 'tinggi')),
  created_at timestamptz default now()
);

-- Entri mood harian
create table public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mood_scale smallint not null check (mood_scale between 1 and 5),
  note text,
  trigger_tag text,
  entry_date date not null default current_date,
  created_at timestamptz default now(),
  unique (user_id, entry_date)
);

-- Entri jurnal (isi terenkripsi di level aplikasi sebelum insert)
create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt_id text,
  content_encrypted text not null,
  flagged_crisis boolean default false,
  created_at timestamptz default now()
);

-- Sesi peer support
create table public.peer_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id_1 uuid not null references auth.users(id) on delete cascade,
  user_id_2 uuid references auth.users(id) on delete cascade,
  topic text not null,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'ended', 'reported')),
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz default now()
);

-- Pesan dalam sesi peer support (opsional disimpan, bisa di-purge berkala)
create table public.peer_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.peer_sessions(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- Log krisis untuk audit keamanan — TIDAK menyimpan isi teks asli
create table public.crisis_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('journal', 'peer_chat', 'unknown')),
  severity text not null check (severity in ('watch', 'high')),
  created_at timestamptz default now()
);

-- Directory bantuan profesional (data bisa diisi manual/dummy untuk demo)
create table public.professional_directory (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialization text,
  city text,
  mode text check (mode in ('online', 'offline', 'both')),
  price_range text,
  contact_info text,
  is_demo_data boolean default true
);

-- ============================================================
-- Row Level Security — memastikan data privat user tidak bisa
-- diakses user lain, ditegakkan di level database, bukan hanya UI.
-- ============================================================

alter table public.profiles enable row level security;
alter table public.screening_results enable row level security;
alter table public.mood_entries enable row level security;
alter table public.journal_entries enable row level security;
alter table public.peer_sessions enable row level security;
alter table public.peer_messages enable row level security;
alter table public.crisis_logs enable row level security;
alter table public.professional_directory enable row level security;

-- Profiles: siapa saja yang login boleh lihat nickname (untuk peer support),
-- tapi hanya pemilik yang boleh update datanya sendiri.
create policy "profiles_select_authenticated" on public.profiles
  for select using (auth.role() = 'authenticated');
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Screening results: hanya pemilik
create policy "screening_owner_only" on public.screening_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Mood entries: hanya pemilik
create policy "mood_owner_only" on public.mood_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Journal entries: hanya pemilik — TIDAK ADA policy select untuk user lain
-- atau admin. Ini yang menjamin privasi jurnal sesuai PRD.
create policy "journal_owner_only" on public.journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Peer sessions: hanya kedua partisipan yang bisa lihat
create policy "peer_session_participants" on public.peer_sessions
  for select using (auth.uid() = user_id_1 or auth.uid() = user_id_2);
create policy "peer_session_insert_self" on public.peer_sessions
  for insert with check (auth.uid() = user_id_1);

-- Peer messages: hanya partisipan sesi terkait
create policy "peer_messages_participants" on public.peer_messages
  for select using (
    exists (
      select 1 from public.peer_sessions s
      where s.id = session_id
        and (s.user_id_1 = auth.uid() or s.user_id_2 = auth.uid())
    )
  );
create policy "peer_messages_insert_participants" on public.peer_messages
  for insert with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.peer_sessions s
      where s.id = session_id
        and (s.user_id_1 = auth.uid() or s.user_id_2 = auth.uid())
        and s.status = 'active'
    )
  );

-- Crisis logs: TIDAK ADA policy select untuk user biasa.
-- Hanya bisa diakses lewat service role key di server (lihat server.ts),
-- misal untuk keperluan audit/moderasi internal.
create policy "crisis_logs_insert_own" on public.crisis_logs
  for insert with check (auth.uid() = user_id);

-- Professional directory: publik, siapa saja boleh baca
create policy "directory_public_read" on public.professional_directory
  for select using (true);

-- ============================================================
-- Trigger: otomatis buat baris profiles saat user baru signup
-- ============================================================
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, 'user_' || substr(new.id::text, 1, 8));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
