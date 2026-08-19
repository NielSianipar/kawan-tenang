# Struktur Platform Kesehatan Mental untuk Gen Z

## 1. Konsep Inti

**Nama sementara:** (isi sendiri, sarannya: kata yang terasa hangat & santai — misal "Ruang", "Napas", "Temani", "Curhat.in")

**Tagline arah:** "Bukan sekadar tempat curhat, tapi ruang aman untuk pulih bareng."

**Masalah yang dijawab:**
- Gen Z sering merasa hidupnya "paling hancur" karena tekanan sosial media, komparasi hidup, dan minimnya ruang aman untuk cerita.
- Akses ke bantuan profesional mahal & terasa jauh/menakutkan.
- Forum curhat yang ada sekarang sering tidak aman (toxic positivity, komentar meremehkan, atau malah memperparah kondisi user).

**Diferensiasi utama:** kombinasi *self-awareness tools* (berbasis evidence) + *peer support yang terstruktur & aman* + *jalur eskalasi ke profesional* — bukan forum bebas tanpa arah.

---

## 2. Target Pengguna

- Usia 15–25 tahun (pelajar SMA–mahasiswa awal kerja)
- Merasa stres, cemas, burnout, atau kesepian tapi belum siap/mampu ke psikolog
- Butuh validasi & dukungan tanpa judgment

---

## 3. Fitur (dari yang wajib sampai nice-to-have)

### A. Fitur Inti (MVP — wajib ada untuk lomba)
1. **Onboarding & Screening Ringan**
   - Kuesioner singkat berbasis skala tervalidasi (misal adaptasi ringan dari PHQ-9/GAD-7) untuk memetakan kondisi awal user.
   - Hasil bukan "diagnosa", tapi kategori umum (misal: "tampaknya kamu sedang cukup tertekan") + rekomendasi langkah.

2. **Mood Tracker Harian**
   - User isi mood 1x/hari (emoji/skala 1-5) + catatan singkat opsional.
   - Visualisasi tren mingguan/bulanan (grafik sederhana).

3. **Journaling Terpandu**
   - Prompt refleksi harian (bukan kolom kosong bebas), contoh: "Apa satu hal yang bikin kamu lelah hari ini?", "Apa satu hal kecil yang kamu syukuri?"
   - Bisa privat sepenuhnya (tidak dibagikan ke siapapun).

4. **Peer Support Terstruktur (bukan forum bebas)**
   - User dipasangkan (matched) dengan 1 peer berdasarkan kemiripan situasi/topik, sesi chat terbatas waktu (misal 30-60 menit).
   - Ada guideline chat yang ditampilkan di awal sesi (aturan: dengarkan, jangan menghakimi, jangan kasih saran medis).
   - Sistem bisa laporkan/skip peer jika chat terasa tidak nyaman.

5. **Deteksi Kata Kunci Krisis + Jalur Eskalasi**
   - Sistem mendeteksi kata/pola berisiko tinggi (menyebut ingin mengakhiri hidup, self-harm, dll) di journaling/chat.
   - Jika terdeteksi → otomatis tampilkan hotline krisis & tombol "Saya butuh bantuan sekarang" yang mengarahkan ke kontak darurat/lembaga resmi.
   - Ini FITUR WAJIB, bukan opsional — nilai kredibilitas terbesar di mata juri.

6. **Directory Bantuan Profesional**
   - Daftar psikolog/lembaga (bisa data dummy untuk keperluan demo lomba) dengan filter harga terjangkau, online/offline, spesialisasi.

### B. Fitur Pembeda (nilai tambah, bikin menang)
7. **Micro-CBT Exercises**
   - Latihan singkat 2-5 menit: cognitive reframing ("apakah pikiran ini fakta atau asumsi?"), teknik pernapasan, grounding 5-4-3-2-1.
8. **Insight Mingguan berbasis AI**
   - Ringkasan pola dari mood tracker + journaling: "Minggu ini kamu sering merasa cemas di malam hari, mungkin coba journaling sebelum tidur."
9. **Gamifikasi ringan**
   - Streak journaling, badge progres (bukan kompetisi sosial, lebih ke self-progress supaya tidak memicu komparasi antar user).
10. **Anonymous tapi aman**
    - User anonim ke sesama user (nickname), tapi sistem tetap simpan identitas minimal untuk keperluan keamanan jika terjadi kondisi krisis.

### C. Nice-to-have (kalau waktu lomba masih cukup)
- Komunitas topik kecil (grup tematik: burnout kuliah, family issue, dll) dengan moderator
- Reminder check-in harian via notifikasi
- Mode "tenang" — musik/white noise sederhana terintegrasi

---

## 4. User Flow (alur utama)

```
Landing Page
   ↓
Sign Up / Login (anonim dengan nickname, email untuk keamanan)
   ↓
Onboarding Screening (kuesioner singkat)
   ↓
Dashboard Utama
   ├─ Mood Tracker (isi mood hari ini)
   ├─ Journaling (prompt harian)
   ├─ Insight Mingguan
   ├─ Peer Support → cari/matched peer → sesi chat terbatas
   ├─ Micro-CBT Exercise
   └─ Directory Bantuan Profesional

[Trigger Krisis kapan saja] → Popup Bantuan Darurat + Hotline
```

---

## 5. Daftar Halaman (untuk pembagian kerja tim)

1. Landing Page (penjelasan platform, ajakan mulai)
2. Sign Up / Login
3. Onboarding Screening
4. Dashboard
5. Mood Tracker (input + grafik riwayat)
6. Journaling (input + riwayat entri privat)
7. Peer Support (matching + ruang chat)
8. Micro-CBT Exercise
9. Directory Bantuan Profesional
10. Halaman Bantuan Darurat (selalu bisa diakses dari mana saja, misal tombol floating)
11. Profil & Pengaturan Privasi

---

## 6. Saran Tech Stack (sesuaikan dengan kemampuan tim)

- **Frontend:** React / Next.js (kalau butuh cepat & modern), atau HTML-CSS-JS kalau tim masih basic
- **Backend:** Node.js (Express) atau Supabase/Firebase untuk mempercepat development (auth + database sudah siap pakai)
- **Database:** PostgreSQL (Supabase) atau Firestore
- **Deteksi kata kunci krisis:** bisa mulai simpel dengan keyword matching, kalau mau lebih canggih bisa pakai API AI (misal Claude API) untuk analisis sentimen/konten berisiko
- **Grafik mood tracker:** Chart.js / Recharts

---

## 7. Yang Perlu Ditekankan Saat Presentasi ke Juri

1. **Mulai dari data/riset nyata** — sisipkan statistik soal kesehatan mental Gen Z Indonesia (cari dari sumber resmi seperti Kemenkes, WHO, atau riset universitas) di awal presentasi.
2. **Tunjukkan fitur deteksi krisis & eskalasi sebagai nilai utama**, bukan cuma pelengkap — ini yang membedakan proyekmu dari platform curhat biasa.
3. **Jelaskan dasar evidence-based** dari fitur (CBT, screening tool) supaya terlihat kredibel, bukan asal bikin fitur.
4. **Demo interaktif**, bukan cuma mockup — kalau sempat, buat alur mood tracker & journaling benar-benar berfungsi saat demo.
5. **Jujur soal keterbatasan** — sampaikan bahwa ini bukan pengganti terapi profesional, tapi jembatan awal. Kejujuran ini justru menambah kredibilitas.

---

## 8. Prioritas Kalau Waktu Lomba Terbatas (mis. 24-48 jam hackathon)

**Wajib jadi (MVP minimum):**
- Landing page + Sign up/login
- Mood tracker + journaling sederhana
- Fitur deteksi kata kunci krisis + popup bantuan darurat
- Directory bantuan profesional (bisa data statis)

**Kalau waktu masih ada:**
- Peer support matching
- Micro-CBT exercise
- Insight mingguan

**Skip dulu kalau waktu mepet:**
- Gamifikasi, komunitas grup, fitur notifikasi
