# Product Requirements Document (PRD)
# Platform Dukungan Kesehatan Mental untuk Gen Z

**Versi:** 1.0
**Tanggal:** 19 Agustus 2026
**Status:** Draft untuk kompetisi web development
**Pemilik Dokumen:** (isi nama tim/kamu)

---

## 1. Ringkasan Eksekutif

Platform ini adalah web aplikasi kesehatan mental yang dirancang khusus untuk Gen Z (usia 15–25 tahun), menggabungkan tiga pilar: **self-awareness tools** (mood tracking, journaling terpandu, screening ringan), **peer support terstruktur** (bukan forum bebas), dan **jalur eskalasi ke bantuan profesional** ketika terdeteksi tanda-tanda krisis. Produk ini menjawab masalah nyata: banyak Gen Z merasa tertekan secara emosional namun tidak memiliki ruang aman untuk bercerita, dan platform curhat yang ada saat ini seringkali tidak memiliki mekanisme keamanan yang memadai.

---

## 2. Latar Belakang & Masalah

### 2.1 Konteks Masalah
- Gen Z menghadapi tekanan unik: perbandingan sosial di media sosial, ekspektasi akademik/karier, dan krisis identitas di usia muda.
- Banyak yang merasa "hidupnya paling hancur" dibanding orang lain — sebuah distorsi kognitif yang diperparah oleh algoritma media sosial yang menampilkan sisi terbaik hidup orang lain.
- Akses ke psikolog profesional terhambat oleh biaya, stigma, dan rasa "belum cukup parah untuk konsultasi".
- Ruang curhat anonim yang sudah ada (forum, grup Telegram/Discord) sering tidak memiliki moderasi, sehingga berisiko memperparah kondisi pengguna (contoh: trauma dumping tanpa arah, komentar menghakimi, atau paparan konten berisiko tanpa filter).

### 2.2 Pernyataan Masalah (Problem Statement)
> "Gen Z membutuhkan ruang yang aman, terstruktur, dan tervalidasi secara psikologis untuk memahami kondisi emosional mereka, terhubung dengan sesama, dan mendapat jalan menuju bantuan profesional — tanpa risiko yang ditimbulkan oleh forum curhat bebas tanpa pengawasan."

### 2.3 Mengapa Sekarang
- Meningkatnya kesadaran isu kesehatan mental di kalangan muda Indonesia.
- Minimnya platform lokal yang menggabungkan pendekatan berbasis bukti (evidence-based) dengan pengalaman digital yang relate ke Gen Z.

---

## 3. Tujuan Produk

### 3.1 Goals
1. Menyediakan alat self-awareness yang membantu pengguna mengenali pola emosional mereka.
2. Menyediakan ruang peer-support yang aman dan terstruktur.
3. Mendeteksi tanda-tanda krisis secara proaktif dan mengarahkan ke bantuan yang tepat.
4. Menjembatani pengguna ke layanan profesional tanpa menggantikan peran layanan tersebut.
5. Membangun kebiasaan reflektif harian yang sehat (habit-forming yang positif, bukan adiktif).

### 3.2 Non-Goals (di luar cakupan)
- Platform ini **tidak** menyediakan diagnosis klinis.
- Platform ini **tidak** menggantikan terapi/konsultasi psikolog berlisensi.
- Platform ini **tidak** dirancang sebagai media sosial terbuka (tidak ada feed publik, tidak ada like/comment publik).
- Platform ini **tidak** menangani situasi darurat secara langsung (bukan pengganti layanan gawat darurat/hotline resmi — hanya mengarahkan ke sana).

---

## 4. Target Pengguna & Persona

### 4.1 Target Utama
Usia 15–25 tahun, pelajar SMA hingga pekerja awal karier, mengalami stres/cemas/burnout ringan hingga sedang, melek digital, aktif di media sosial.

### 4.2 Persona

**Persona 1 — "Rani, 19, Mahasiswa Tahun 2"**
Sering merasa cemas soal nilai dan masa depan, membandingkan diri dengan teman-teman di Instagram, belum pernah konsultasi ke psikolog karena merasa "masalahnya belum cukup berat" dan takut biaya.

**Persona 2 — "Bimo, 22, Fresh Graduate"**
Mengalami burnout mencari kerja, merasa kesepian karena circle pertemanan mengecil setelah lulus kuliah, butuh ruang untuk cerita tanpa dihakimi.

**Persona 3 — "Salma, 16, Siswa SMA"**
Tekanan akademik tinggi, konflik keluarga, belum berani cerita ke orang tua, mencari validasi dari sesama remaja yang mengerti situasinya.

---

## 5. Metrik Keberhasilan (Success Metrics)

| Kategori | Metrik | Target Indikatif |
|---|---|---|
| Engagement | Jumlah entri mood/journaling per user per minggu | ≥ 3 entri/minggu |
| Retensi | User aktif kembali dalam 7 hari (retention D7) | ≥ 30% |
| Keamanan | Waktu deteksi kata kunci krisis hingga munculnya bantuan | < 2 detik |
| Konversi bantuan | Persentase user yang klik directory bantuan profesional setelah screening berisiko tinggi | ≥ 15% |
| Kepuasan | Skor kepuasan peer-support session (survei singkat pasca sesi) | ≥ 4/5 |

*(Catatan: untuk kebutuhan lomba, metrik ini cukup dicantumkan sebagai rencana pengukuran, tidak perlu data real karena produk masih prototipe.)*

---

## 6. Ruang Lingkup Fitur (Functional Requirements)

### 6.1 Modul Onboarding & Autentikasi

**FR-1.1 Sign Up / Login**
- User mendaftar dengan email + nickname anonim (nickname yang tampil ke user lain, email tidak pernah ditampilkan).
- Opsi login dengan Google untuk mempercepat proses (opsional).
- Password di-hash (bukan plaintext) — untuk demo bisa pakai library standar (bcrypt, atau auth provider seperti Supabase Auth/Firebase Auth).

**FR-1.2 Onboarding Screening**
- Setelah daftar, user mengisi kuesioner singkat (8-10 pertanyaan), diadaptasi ringan dari alat skrining tervalidasi seperti PHQ-9 (depresi) dan GAD-7 (kecemasan), dengan bahasa yang disederhanakan dan disclaimer bahwa ini bukan alat diagnosis.
- Skor dikategorikan: rendah / sedang / tinggi.
- Jika skor tinggi → tampilkan pesan empatik + directory bantuan profesional + opsi lanjut ke dashboard.
- Hasil skrining disimpan untuk personalisasi konten (bukan untuk dibagikan ke user lain).

**Acceptance Criteria:**
- User tidak bisa mengakses dashboard sebelum menyelesaikan onboarding screening (atau bisa skip dengan konfirmasi eksplisit).
- Disclaimer "bukan diagnosis medis" harus tampil sebelum dan sesudah pengisian kuesioner.

---

### 6.2 Modul Mood Tracker

**FR-2.1 Input Mood Harian**
- User memilih 1 dari 5 skala emoji/mood (misal: sangat buruk → sangat baik) setiap hari.
- Opsional: tambahkan catatan singkat (maks. 200 karakter) dan tag pemicu (misal: akademik, keluarga, pertemanan, kesehatan, keuangan).

**FR-2.2 Visualisasi Riwayat**
- Grafik garis/bar mingguan dan bulanan menampilkan tren mood.
- Highlight pola (misal: "Mood kamu cenderung turun setiap Senin").

**Acceptance Criteria:**
- Satu entri mood per hari (tidak bisa duplikat, tapi bisa diedit di hari yang sama).
- Grafik ter-render dengan data dummy jika user baru belum punya riwayat cukup.

---

### 6.3 Modul Journaling Terpandu

**FR-3.1 Prompt Refleksi Harian**
- Sistem menampilkan 1 prompt reflektif per hari (rotasi dari bank prompt, misal 30-50 prompt berbeda).
- Kategori prompt: gratitude, pelepasan emosi, self-compassion, goal-setting kecil.

**FR-3.2 Riwayat Jurnal Privat**
- Semua entri jurnal bersifat privat sepenuhnya — tidak bisa dilihat siapa pun termasuk admin, kecuali terdeteksi kata kunci krisis (lihat 6.5).
- User bisa melihat, mengedit, atau menghapus entri lama.

**Acceptance Criteria:**
- Entri jurnal dienkripsi saat disimpan di database (minimal enkripsi at-rest).
- Tidak ada fitur share/publish jurnal ke user lain.

---

### 6.4 Modul Peer Support Terstruktur

**FR-4.1 Matching Peer**
- User memilih topik yang ingin dibicarakan (misal: akademik, keluarga, pertemanan, kesehatan mental umum).
- Sistem mencarikan peer lain yang aktif dan memilih topik serupa (matching sederhana berbasis antrian/topik, bukan algoritma kompleks untuk versi MVP).

**FR-4.2 Sesi Chat Terbatas Waktu**
- Sesi chat berlangsung maksimal 30-60 menit, ditampilkan timer.
- Sebelum sesi dimulai, kedua user wajib menyetujui **Community Guidelines** (dengarkan tanpa menghakimi, tidak memberi saran medis, tidak meminta kontak pribadi, dsb).
- Chat bersifat anonim (nickname saja) dan tidak disimpan permanen setelah sesi berakhir (opsional: simpan terenkripsi untuk keperluan moderasi jika dilaporkan).

**FR-4.3 Fitur Keamanan dalam Sesi**
- Tombol "Laporkan" dan "Akhiri Sesi" selalu terlihat.
- Jika dilaporkan, sesi otomatis berakhir dan masuk ke antrian review moderator (untuk MVP bisa berupa log yang bisa direview manual).

**Acceptance Criteria:**
- Tidak ada fitur pertukaran kontak pribadi (nomor HP, media sosial) dalam UI chat.
- Sesi otomatis berakhir saat waktu habis, dengan opsi "perpanjang 15 menit" jika kedua pihak setuju.

---

### 6.5 Modul Deteksi Krisis & Eskalasi (Fitur Kritis)

**FR-5.1 Deteksi Kata Kunci Berisiko**
- Sistem memindai input dari journaling dan chat peer-support untuk mendeteksi kata/frasa yang mengindikasikan risiko tinggi (ide bunuh diri, self-harm, keputusasaan ekstrem).
- Untuk MVP: gunakan pendekatan keyword-matching + daftar frasa berisiko (dikembangkan bersama referensi dari sumber kesehatan mental resmi). Untuk versi lanjutan: bisa menggunakan model klasifikasi teks/API AI untuk analisis konteks yang lebih akurat.

**FR-5.2 Respons Otomatis saat Terdeteksi**
- Saat terdeteksi, tampilkan modal/popup yang tidak bisa langsung ditutup begitu saja, berisi:
  - Pesan empatik (tidak menghakimi, tidak panik)
  - Nomor hotline krisis resmi (misal Kemenkes 119 ext 8, atau layanan krisis terpercaya lain sesuai wilayah)
  - Tombol langsung ke halaman bantuan darurat
  - Opsi untuk tetap melanjutkan aktivitas jika user merasa hanya sedang menulis fiksi/refleksi (agar tidak terlalu memaksa, tapi tetap menyediakan akses)

**FR-5.3 Tombol Bantuan Darurat Global**
- Tombol/ikon bantuan darurat tersedia di semua halaman (floating button), bisa diakses kapan saja tanpa harus menunggu deteksi otomatis.

**Acceptance Criteria:**
- Fitur ini diuji dengan berbagai skenario kalimat untuk memastikan tidak terlalu sensitif (banyak false positive) maupun terlalu longgar (miss risiko nyata).
- Tidak ada bagian dari sistem yang mengklaim mampu "menangani" krisis — sistem hanya mengarahkan ke bantuan yang tepat.

---

### 6.6 Modul Micro-CBT Exercises

**FR-6.1 Latihan Singkat**
- Kumpulan latihan 2-5 menit: cognitive reframing (menantang pikiran negatif), teknik pernapasan kotak (box breathing), grounding 5-4-3-2-1.
- Setiap latihan disertai instruksi step-by-step dan opsional timer.

**Acceptance Criteria:**
- Latihan bisa diakses langsung dari popup deteksi krisis sebagai opsi self-help awal (bukan pengganti hotline, tapi pelengkap).

---

### 6.7 Modul Insight Mingguan

**FR-7.1 Ringkasan Pola**
- Setiap akhir minggu, sistem menghasilkan ringkasan sederhana dari data mood tracker + journaling (misal: "Minggu ini kamu paling sering merasa cemas di malam hari, terutama terkait topik akademik").
- Insight bersifat deskriptif, bukan preskriptif/medis.

**Acceptance Criteria:**
- Insight hanya digenerate jika ada minimal 3 entri dalam seminggu (untuk menghindari kesimpulan yang tidak representatif).

---

### 6.8 Modul Directory Bantuan Profesional

**FR-8.1 Daftar Layanan**
- Menampilkan daftar psikolog/lembaga (untuk keperluan demo lomba, bisa data statis/dummy) dengan filter: harga, online/offline, spesialisasi, kota.
- Setiap entri menampilkan info kontak dan cara menghubungi.

**Acceptance Criteria:**
- Semua data yang ditampilkan berlabel jelas jika merupakan data contoh/dummy untuk keperluan demo.

---

### 6.9 Modul Profil & Pengaturan Privasi

**FR-9.1 Pengaturan Akun**
- User bisa mengubah nickname, foto profil (opsional/generic avatar), preferensi notifikasi.

**FR-9.2 Kontrol Privasi**
- User bisa menghapus akun beserta seluruh data (mood, jurnal, riwayat chat) — hak untuk dilupakan.
- User bisa mengunduh data mereka sendiri (ekspor sederhana, misal JSON/PDF).

**Acceptance Criteria:**
- Penghapusan akun bersifat permanen dan dikonfirmasi dua langkah (misal ketik "HAPUS" untuk konfirmasi).

---

## 7. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kategori | Kebutuhan |
|---|---|
| Keamanan Data | Enkripsi data sensitif (jurnal, hasil screening) minimal at-rest; koneksi wajib HTTPS |
| Privasi | Tidak ada data pribadi yang ditampilkan ke user lain; kepatuhan prinsip minim data (data minimization) |
| Performa | Waktu muat halaman < 3 detik pada koneksi standar |
| Aksesibilitas | Kontras warna memadai, ukuran font mudah dibaca, mendukung navigasi keyboard dasar |
| Skalabilitas | Arsitektur mampu menangani penambahan modul baru tanpa refactor besar (khususnya modul matching peer) |
| Ketersediaan | Target uptime demo 99% selama periode penilaian lomba |
| Responsif | Tampilan optimal di mobile (prioritas utama karena target Gen Z mayoritas akses via HP) dan desktop |

---

## 8. Alur Pengguna (User Flow)

```
Landing Page
   ↓
Sign Up / Login
   ↓
Onboarding Screening (skrining ringan)
   ↓
Dashboard Utama
   ├─ Mood Tracker → Input mood → Lihat grafik riwayat
   ├─ Journaling → Isi prompt harian → Riwayat jurnal privat
   ├─ Insight Mingguan → Lihat ringkasan pola
   ├─ Peer Support → Pilih topik → Matching → Sesi chat (timer) → Akhiri/Laporkan
   ├─ Micro-CBT Exercise → Pilih latihan → Ikuti instruksi
   ├─ Directory Bantuan Profesional → Filter → Lihat kontak
   └─ Profil & Pengaturan → Edit akun / Hapus akun / Ekspor data

[Deteksi Kata Kunci Krisis - kapan saja] → Popup Bantuan Darurat (hotline + arahan)
[Tombol Bantuan Darurat Global] → Selalu tersedia di semua halaman
```

---

## 9. Spesifikasi Halaman (Page-by-Page)

| # | Halaman | Elemen Utama |
|---|---|---|
| 1 | Landing Page | Hero section, penjelasan singkat platform, CTA "Mulai Sekarang", testimoni/statistik, link kebijakan privasi |
| 2 | Sign Up / Login | Form email + nickname + password, opsi login Google, link ke onboarding |
| 3 | Onboarding Screening | Progress bar, 8-10 pertanyaan, disclaimer, hasil kategori |
| 4 | Dashboard | Ringkasan mood terakhir, shortcut ke semua modul, reminder journaling hari ini |
| 5 | Mood Tracker | Input emoji/skala, catatan opsional, tag pemicu, grafik riwayat |
| 6 | Journaling | Prompt hari ini, kolom input, riwayat entri (list, bisa dibuka per entri) |
| 7 | Peer Support - Pilih Topik | Daftar topik, tombol "Cari Teman Bicara" |
| 8 | Peer Support - Ruang Chat | Kolom chat, timer sesi, tombol laporkan/akhiri, guideline yang bisa dibuka kembali |
| 9 | Micro-CBT Exercise | Daftar latihan, halaman detail per latihan dengan timer/instruksi |
| 10 | Insight Mingguan | Ringkasan naratif + grafik pendukung |
| 11 | Directory Bantuan Profesional | Filter (harga, lokasi, mode), daftar kartu psikolog/lembaga |
| 12 | Halaman Bantuan Darurat | Nomor hotline resmi, tombol call/WA langsung, pesan menenangkan |
| 13 | Profil & Pengaturan | Edit profil, kontrol privasi, hapus akun, ekspor data |

---

## 10. Arsitektur Teknis (Usulan)

**Frontend:** React / Next.js — mendukung routing cepat dan komponen reusable untuk kartu, grafik, dan modal.

**Backend & Database:** Supabase atau Firebase — mempercepat pengembangan autentikasi, database real-time (cocok untuk fitur chat peer-support), dan storage.

**Deteksi Kata Kunci Krisis:**
- MVP: keyword matching berbasis daftar frasa berisiko (server-side, dijalankan setiap kali entri jurnal/chat disimpan).
- Pengembangan lanjutan: klasifikasi teks berbasis API AI untuk memahami konteks kalimat, bukan hanya kata kunci literal.

**Visualisasi Data:** Chart.js atau Recharts untuk grafik mood tracker dan insight mingguan.

**Real-time Chat (Peer Support):** WebSocket (Supabase Realtime / Firebase Firestore listener) untuk chat langsung.

**Hosting:** Vercel/Netlify untuk frontend, backend mengikuti provider yang dipilih (Supabase/Firebase sudah termasuk hosting backend).

---

## 11. Model Data (Ringkas)

**User**
- id, email (hash/terenkripsi), nickname, password_hash, created_at, screening_result_terakhir

**MoodEntry**
- id, user_id, tanggal, skala_mood, catatan, tag_pemicu

**JournalEntry**
- id, user_id, tanggal, prompt_id, isi (terenkripsi), flag_krisis (boolean)

**PeerSession**
- id, user_id_1, user_id_2, topik, waktu_mulai, waktu_selesai, status (aktif/selesai/dilaporkan)

**ScreeningResult**
- id, user_id, tanggal, skor, kategori (rendah/sedang/tinggi)

**CrisisLog** (internal, untuk audit keamanan — bukan untuk dibaca sembarangan)
- id, user_id, sumber (journal/chat), waktu, tindakan_sistem

---

## 12. Pertimbangan Etis & Keamanan

1. **Bukan pengganti layanan profesional** — disclaimer ini harus muncul di halaman utama, onboarding, dan setiap fitur yang berkaitan langsung dengan kondisi emosional.
2. **Tidak ada iklan atau monetisasi yang memanfaatkan kerentanan emosional pengguna** (misal tidak boleh ada iklan produk yang muncul berdasarkan mood negatif user).
3. **Transparansi soal data** — jelaskan di kebijakan privasi bagaimana data digunakan, terutama soal deteksi kata kunci krisis (user berhak tahu bahwa sistem memindai kontennya demi keamanan).
4. **Minim intervensi berlebihan** — sistem membantu, bukan memaksa; user tetap punya kontrol atas datanya (bisa hapus/ekspor).
5. **Uji fitur deteksi krisis dengan hati-hati** sebelum demo — pastikan tidak salah memicu di depan juri dengan kalimat yang wajar, namun tetap mampu menangkap skenario berisiko yang jelas.

---

## 13. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| False positive/negative pada deteksi krisis | Kepercayaan user terganggu atau risiko nyata terlewat | Uji dengan banyak skenario kalimat sebelum demo; gunakan daftar kata kunci yang sudah divalidasi |
| User memanfaatkan peer-support untuk hal negatif (harassment) | Pengalaman pengguna lain terganggu | Guideline wajib disetujui + tombol laporkan + moderasi pasca-sesi |
| Data sensitif bocor | Kerugian besar terhadap privasi user | Enkripsi data, HTTPS wajib, minim retensi data chat |
| Waktu pengembangan terbatas (lomba) | Fitur tidak selesai semua | Prioritaskan MVP (lihat bagian 14) |

---

## 14. Prioritas Pengembangan (Roadmap untuk Konteks Lomba)

**Fase 1 — MVP (wajib selesai):**
- Landing page, sign up/login, onboarding screening
- Mood tracker + journaling dasar
- Deteksi kata kunci krisis + popup bantuan darurat
- Directory bantuan profesional (data statis)

**Fase 2 — Jika waktu tersedia:**
- Peer support matching + ruang chat
- Micro-CBT exercises
- Insight mingguan

**Fase 3 — Pengembangan lanjutan (di luar waktu lomba, untuk roadmap masa depan):**
- Deteksi krisis berbasis AI/NLP yang lebih akurat
- Moderasi komunitas grup tematik
- Integrasi langsung dengan penyedia layanan konsultasi (booking system)

---

## 15. Lampiran

### 15.1 Contoh Disclaimer
> "Platform ini bukan layanan diagnosis atau pengganti konsultasi psikolog/psikiater. Jika kamu merasa dalam kondisi darurat, segera hubungi layanan bantuan profesional atau hotline krisis terdekat."

### 15.2 Referensi yang Disarankan untuk Riset Lanjutan
- Alat skrining: PHQ-9 (Patient Health Questionnaire), GAD-7 (Generalized Anxiety Disorder scale) — gunakan versi adaptasi bahasa yang ramah, bukan salinan langsung tanpa izin.
- Data statistik kesehatan mental Gen Z Indonesia: cari dari Kementerian Kesehatan RI, riset lembaga seperti UNICEF Indonesia atau universitas lokal untuk memperkuat pitch.
