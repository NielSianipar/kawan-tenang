"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import {
  HeartIcon,
  JournalIcon,
  PeerIcon,
  WindIcon,
  InsightIcon,
  DirectoryIcon,
  SparklesIcon,
} from "@/components/common/Icons";
import { MoodWeatherCard } from "@/components/dashboard/MoodWeatherCard";
import { MilestoneBadges } from "@/components/gamification/MilestoneBadges";

const MOOD_EMOJIS = [
  { scale: 1, emoji: "😔", label: "Sangat Buruk" },
  { scale: 2, emoji: "🙁", label: "Buruk" },
  { scale: 3, emoji: "😐", label: "Netral" },
  { scale: 4, emoji: "🙂", label: "Baik" },
  { scale: 5, emoji: "😊", label: "Sangat Baik" },
];

export default function DashboardOverviewPage() {
  const user = useAppStore((s) => s.user);
  const moodEntries = useAppStore((s) => s.moodEntries);
  const journalEntries = useAppStore((s) => s.journalEntries);
  const addMoodEntry = useAppStore((s) => s.addMoodEntry);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayMood = moodEntries.find((m) => m.entryDate === todayStr);

  const greetingTime = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
  }, []);

  const handleQuickMood = (scale: number) => {
    addMoodEntry({
      moodScale: scale,
      entryDate: todayStr,
      note: "Check-in cepat dari dashboard",
      triggerTag: "Umum",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Empathetic Greeting & Streak */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sage-50 border border-sage-200 px-3 py-1 text-xs font-semibold text-sage-700 mb-3">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Ruang Tenangmu Hari Ini</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink-900 leading-tight">
            {greetingTime},{" "}
            <span className="text-sage-600">{user?.nickname || "Kawan"}</span>.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-700 leading-relaxed">
            Bagaimana perasaanmu saat ini? Ingat, apa pun yang kamu rasakan hari ini, kamu tidak harus menanggung semuanya sendirian.
          </p>
        </div>

        {/* Quick Streak & Mood Status Pill */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="rounded-2xl bg-mist-100 p-4 border border-ink-200 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                Refleksi Berjalan
              </div>
              <div className="text-lg font-bold text-ink-900">
                {moodEntries.length + journalEntries.length} Aktivitas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Row: Mood Weather Widget + Quick Mood Check-in Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <MoodWeatherCard />
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="font-display text-base text-ink-900 flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-rose-500" />
                <span>Check-in Cepat Mood Hari Ini</span>
              </h2>
            </div>
            <Link
              href="/dashboard/mood"
              className="text-xs font-semibold text-sage-600 hover:text-sage-700 underline"
            >
              Lihat Grafik Lengkap →
            </Link>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {MOOD_EMOJIS.map((item) => {
              const isSelected = todayMood?.moodScale === item.scale;
              return (
                <button
                  key={item.scale}
                  onClick={() => handleQuickMood(item.scale)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${
                    isSelected
                      ? "bg-sage-50 border-sage-600 shadow-sm ring-2 ring-sage-600/20"
                      : "bg-mist-50 border-ink-200 hover:border-sage-400 hover:bg-white"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                  <span className="mt-1 text-[10px] font-medium text-ink-700 text-center line-clamp-1">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Modules & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Guided Journaling */}
        <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
              <JournalIcon className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-bold">
              Journaling Terpandu
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Tulis & Uraikan Pikiran
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Disediakan prompt harian untuk membantumu melepas beban dan mensyukuri hal kecil secara privat & terenkripsi.
            </p>
          </div>
          <Link
            href="/dashboard/journal"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-sage-50 hover:text-sage-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
          >
            Tulis Jurnal Hari Ini →
          </Link>
        </div>

        {/* Card 2: Structured Peer Support */}
        <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-200">
              <PeerIcon className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal-600 font-bold">
              Peer Support Terstruktur
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Ngobrol 1-on-1 dengan Teman
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Terhubung anonim dengan sesama teman bicara dengan batasan waktu, etika aman, dan topik pilihan.
            </p>
          </div>
          <Link
            href="/dashboard/peer-support"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-teal-50 hover:text-teal-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
          >
            Cari Teman Bicara →
          </Link>
        </div>

        {/* Card 3: Micro-CBT Exercises */}
        <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-200">
              <WindIcon className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-bold">
              Micro-CBT Exercises
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Latihan Menenangkan 2–5 Menit
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Teknik pernapasan Box Breathing, grounding 5-4-3-2-1, dan tantang pikiran negatif dengan cognitive reframing.
            </p>
          </div>
          <Link
            href="/dashboard/exercises"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-indigo-50 hover:text-indigo-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
          >
            Mulai Latihan Singkat →
          </Link>
        </div>

        {/* Card 4: Weekly Insights */}
        <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
              <InsightIcon className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
              Pola & Insight Mingguan
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Pahami Pola Emosimu
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Analisis cerdas dari catatan mood dan pemicu stres mingguanmu untuk memahami apa yang memengaruhi harimu.
            </p>
          </div>
          <Link
            href="/dashboard/insights"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-emerald-50 hover:text-emerald-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
          >
            Buka Ringkasan Pola →
          </Link>
        </div>

        {/* Card 5: Professional Directory */}
        <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-200">
              <DirectoryIcon className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold">
              Bantuan Profesional
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Direktori Psikolog & Lembaga
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Daftar layanan psikolog dan hotline resmi terverifikasi dengan filter harga terjangkau, spesialisasi, dan lokasi.
            </p>
          </div>
          <Link
            href="/dashboard/directory"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-blue-50 hover:text-blue-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
          >
            Cari Layanan Konseling →
          </Link>
        </div>

        {/* Card 6: Emergency Safe Haven */}
        <div className="bg-gradient-to-br from-rose-50 to-white rounded-3xl p-6 border border-rose-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 border border-rose-200">
              <span className="text-xl font-bold">🆘</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-rose-700 font-bold">
              Jalur Bantuan Darurat
            </span>
            <h3 className="font-display text-lg text-ink-900 mt-1 mb-2">
              Butuh Pertolongan Segera?
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed mb-4">
              Nomor darurat Sejiwa Kemenkes 119 ext. 8, hotline krisis 24 jam, dan kontak penanganan segera selalu aktif.
            </p>
          </div>
          <Link
            href="/emergency"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            Buka Jalur Darurat 119 →
          </Link>
        </div>
      </div>

      {/* Gamification / Milestone Badges Section */}
      <MilestoneBadges />
    </div>
  );
}
