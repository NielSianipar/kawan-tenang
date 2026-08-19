# Ruang — Platform Dukungan Kesehatan Mental untuk Gen Z

Prototipe untuk kompetisi web development. Lihat `PRD.md` (dokumen terpisah)
untuk spesifikasi produk lengkap.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- **Backend/DB:** Supabase (Postgres + Auth + Realtime + Row Level Security)
- **Grafik:** Recharts
- **State management:** Zustand (untuk state kompleks seperti sesi chat/timer)

## Struktur Folder

```
src/
├─ app/
│  ├─ (auth)/login, signup        → autentikasi
│  ├─ onboarding/                 → skrining awal
│  ├─ dashboard/
│  │  ├─ mood/                    → mood tracker
│  │  ├─ journal/                 → journaling terpandu
│  │  ├─ peer-support/[sessionId] → chat peer support
│  │  ├─ exercises/                → micro-CBT
│  │  ├─ insights/                → insight mingguan
│  │  ├─ directory/               → directory bantuan profesional
│  │  └─ profile/                 → profil & privasi
│  ├─ emergency/                  → halaman bantuan darurat (publik, tanpa login)
│  └─ api/crisis-check/           → endpoint deteksi krisis (server-side)
├─ components/
│  ├─ emergency/CrisisModal.tsx   → modal bantuan darurat
│  ├─ dashboard/                  → komponen khusus dashboard
│  └─ ui/                         → komponen UI generik
├─ lib/
│  ├─ supabase/client.ts          → Supabase client (browser)
│  ├─ supabase/server.ts          → Supabase client (server + service role)
│  └─ crisis-detection/keywords.ts → daftar pola & fungsi cek krisis
├─ types/database.ts              → tipe tabel Supabase
└─ middleware.ts                  → proteksi route + refresh sesi
```

## Setup Lokal

### 1. Install dependencies
```bash
npm install
```

### 2. Buat project Supabase
1. Daftar di [supabase.com](https://supabase.com) → buat project baru.
2. Buka **SQL Editor** → jalankan seluruh isi `supabase/schema.sql`.
   Ini akan membuat semua tabel + Row Level Security policies sekaligus.
3. Ambil `Project URL` dan `anon public key` dari **Project Settings > API**.

### 3. Environment variables
```bash
cp .env.local.example .env.local
```
Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sesuai project-mu.

### 4. Jalankan development server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000).

## Yang Sudah Tersedia di Scaffold Ini

- Landing page dengan desain custom (bukan template default)
- Struktur folder lengkap sesuai modul di PRD
- Supabase client (browser + server) dan middleware proteksi route
- Schema database lengkap dengan Row Level Security — jurnal & data
  sensitif user lain tidak bisa diakses meski lewat query langsung
- Modul deteksi krisis tahap awal (keyword matching) + API route server-side
- Komponen `CrisisModal` yang siap dipasang di halaman journaling/chat
- Halaman `/emergency` yang bisa diakses tanpa login

## Yang Perlu Dikembangkan Selanjutnya

Urutan prioritas mengikuti roadmap MVP di PRD bagian 14:

1. **Autentikasi** — halaman `/login` dan `/signup`, hubungkan ke Supabase Auth
   (`supabase.auth.signUp`, `supabase.auth.signInWithPassword`).
2. **Onboarding screening** — form kuesioner + simpan ke tabel `screening_results`.
3. **Mood tracker** — form input + query `mood_entries`, render grafik dengan Recharts.
4. **Journaling** — form input, panggil `/api/crisis-check` sebelum simpan ke
   `journal_entries`. Kalau `severity !== "none"`, tampilkan `<CrisisModal />`.
5. **Directory bantuan profesional** — isi tabel `professional_directory`
   manual dulu (data dummy berlabel jelas), lalu render dengan filter sederhana.
6. **Peer support** (fase 2) — pakai Supabase Realtime channel untuk chat,
   ikuti pola matching sederhana (antrian berdasarkan topic).
7. **Micro-CBT & insight mingguan** (fase 2).

## Catatan Keamanan Penting

- Jangan pernah expose `SUPABASE_SERVICE_ROLE_KEY` ke client — hanya
  dipakai lewat `createServiceRoleClient()` di server.
- Daftar kata kunci krisis di `src/lib/crisis-detection/keywords.ts` masih
  contoh struktur. Sebelum dipakai serius, lengkapi dan review bersama
  referensi kesehatan mental yang kredibel.
- Enkripsi entri jurnal (`content_encrypted`) belum diimplementasi di scaffold
  ini — tambahkan enkripsi AES-256 di server sebelum insert ke database
  (lihat catatan di `.env.local.example` soal `JOURNAL_ENCRYPTION_KEY`).
- Nomor hotline di halaman `/emergency` dan `CrisisModal` perlu diverifikasi
  ulang mendekati waktu demo — kontak layanan bisa berubah.
