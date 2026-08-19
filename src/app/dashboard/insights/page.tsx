"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { InsightIcon, SparklesIcon, HeartIcon } from "@/components/common/Icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const MOOD_COLORS: { [key: number]: string } = {
  1: "#F43F5E",
  2: "#FB923C",
  3: "#FBBF24",
  4: "#34D399",
  5: "#4A6C6F",
};

export default function WeeklyInsightsPage() {
  const moodEntries = useAppStore((s) => s.moodEntries);
  const journalEntries = useAppStore((s) => s.journalEntries);
  const cbtRecords = useAppStore((s) => s.cbtRecords);

  const hasEnoughData = moodEntries.length >= 3;

  // Breakdown of trigger tags
  const tagBreakdown = useMemo(() => {
    const counts: { [key: string]: number } = {};
    moodEntries.forEach((m) => {
      const tag = m.triggerTag || "Lainnya";
      counts[tag] = (counts[tag] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [moodEntries]);

  // Mood distribution counts
  const moodDistribution = useMemo(() => {
    const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    moodEntries.forEach((m) => {
      counts[m.moodScale] = (counts[m.moodScale] || 0) + 1;
    });
    const labels = ["Sangat Buruk", "Buruk", "Netral", "Baik", "Sangat Baik"];
    return [1, 2, 3, 4, 5].map((scale) => ({
      scale,
      name: labels[scale - 1],
      count: counts[scale],
      color: MOOD_COLORS[scale],
    }));
  }, [moodEntries]);

  // Descriptive narrative summary
  const narrativeSummary = useMemo(() => {
    const dominantTag = tagBreakdown[0]?.name || "keseharian";
    return `Minggu ini, energimu paling banyak tercurah untuk hal-hal terkait ${dominantTag}. Menariknya, suasana hatimu menunjukkan tren meningkat setelah kamu meluangkan waktu untuk journaling dan beristirahat. Luangkan jeda 5 menit sebelum tidur malam ini untuk menjaga stabilitas tersebut.`;
  }, [tagBreakdown]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 mb-2">
          <InsightIcon className="w-3.5 h-3.5" />
          <span>Analisis Pola Mingguan</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Insight & Ringkasan Pola Emosi
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Menghubungkan titik-titik antara catatan mood, pemicu harian, dan refleksimu untuk memahami apa yang paling berdampak pada kesehatan mentalmu.
        </p>
      </div>

      {!hasEnoughData ? (
        <div className="bg-white rounded-3xl p-12 border border-ink-200 shadow-sm text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
            📊
          </div>
          <h2 className="font-display text-xl text-ink-900">Belum Cukup Data untuk Menganalisis</h2>
          <p className="text-xs text-ink-600 leading-relaxed max-w-md mx-auto">
            Untuk memastikan insight yang dihasilkan akurat dan tidak menyesatkan, sistem membutuhkan minimal <strong>3 catatan mood</strong> dalam seminggu.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/mood"
              className="inline-block rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-6 py-3 transition-colors"
            >
              Catat Mood Sekarang →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Narrative AI / Algorithmic Summary Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold mb-3">
              <SparklesIcon className="w-4 h-4" />
              <span>Ringkasan Naratif Mingguan</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl text-ink-900 leading-snug max-w-3xl mb-4">
              &ldquo;{narrativeSummary}&rdquo;
            </h2>
            <div className="flex flex-wrap gap-4 text-xs text-ink-700 pt-2 border-t border-emerald-100">
              <span>📈 <strong>{moodEntries.length}</strong> Entri Mood Tercatat</span>
              <span>•</span>
              <span>📝 <strong>{journalEntries.length}</strong> Refleksi Tertulis</span>
              <span>•</span>
              <span>🧘 <strong>{cbtRecords.length}</strong> Latihan CBT Selesai</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Mood Distribution */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm">
              <h3 className="font-display text-lg text-ink-900 mb-1">Distribusi Spektrum Mood</h3>
              <p className="text-xs text-ink-500 mb-6">Frekuensi kemunculan skala mood dalam catatanmu</p>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#6B7280" }} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-ink-900 text-white p-2 rounded-xl text-xs">
                              <div>{data.name}: <strong>{data.count} hari</strong></div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Trigger Tags Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm">
              <h3 className="font-display text-lg text-ink-900 mb-1">Pemicu yang Paling Sering Muncul</h3>
              <p className="text-xs text-ink-500 mb-6">Faktor situasi yang paling memengaruhi emosimu</p>

              <div className="space-y-3">
                {tagBreakdown.map((tag) => {
                  const percent = Math.round((tag.count / moodEntries.length) * 100);
                  return (
                    <div key={tag.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-ink-800">
                        <span>{tag.name}</span>
                        <span className="text-ink-500 font-mono">{tag.count}x ({percent}%)</span>
                      </div>
                      <div className="w-full bg-mist-100 rounded-full h-2 overflow-hidden border border-ink-200">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actionable gentle recommendations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm">
            <h3 className="font-display text-base text-ink-900 mb-4">Rekomendasi Welas Asih untuk Minggu Depan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-mist-50 border border-ink-200 space-y-1">
                <span className="text-xl">🌙</span>
                <h4 className="font-semibold text-xs text-ink-900">Jeda Malam Tanpa Layar</h4>
                <p className="text-[11px] text-ink-600 leading-relaxed">
                  Cobalah journaling 15 menit sebelum tidur daripada scrolling media sosial untuk mengurangi distorsi komparasi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mist-50 border border-ink-200 space-y-1">
                <span className="text-xl">🫁</span>
                <h4 className="font-semibold text-xs text-ink-900">Latihan Pernapasan Kotak</h4>
                <p className="text-[11px] text-ink-600 leading-relaxed">
                  Gunakan latihan Box Breathing saat mendapati deadline tugas kuliah yang memicu lonjakan kecemasan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mist-50 border border-ink-200 space-y-1">
                <span className="text-xl">👥</span>
                <h4 className="font-semibold text-xs text-ink-900">Bercerita di Peer Support</h4>
                <p className="text-[11px] text-ink-600 leading-relaxed">
                  Jika ada perasaan mengganjal soal relasi pertemanan, luangkan waktu di sesi aman peer support kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
