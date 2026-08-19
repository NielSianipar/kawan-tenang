"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { HeartIcon, SparklesIcon } from "@/components/common/Icons";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MOOD_OPTIONS = [
  { scale: 1, emoji: "😔", label: "Sangat Buruk", color: "#F43F5E", bg: "bg-rose-50 border-rose-200" },
  { scale: 2, emoji: "🙁", label: "Buruk", color: "#FB923C", bg: "bg-orange-50 border-orange-200" },
  { scale: 3, emoji: "😐", label: "Netral", color: "#FBBF24", bg: "bg-amber-50 border-amber-200" },
  { scale: 4, emoji: "🙂", label: "Baik", color: "#34D399", bg: "bg-emerald-50 border-emerald-200" },
  { scale: 5, emoji: "😊", label: "Sangat Baik", color: "#4A6C6F", bg: "bg-sage-50 border-sage-200" },
];

const TRIGGER_TAGS = [
  "Akademik",
  "Keluarga",
  "Pertemanan",
  "Kesehatan",
  "Keuangan",
  "Pekerjaan / Karir",
  "Media Sosial",
  "Lainnya",
];

export default function MoodTrackerPage() {
  const moodEntries = useAppStore((s) => s.moodEntries);
  const addMoodEntry = useAppStore((s) => s.addMoodEntry);
  const deleteMoodEntry = useAppStore((s) => s.deleteMoodEntry);

  const todayStr = new Date().toISOString().split("T")[0];
  const existingToday = moodEntries.find((m) => m.entryDate === todayStr);

  const [selectedScale, setSelectedScale] = useState<number>(existingToday?.moodScale || 3);
  const [selectedTag, setSelectedTag] = useState<string>(existingToday?.triggerTag || "Akademik");
  const [note, setNote] = useState<string>(existingToday?.note || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodEntry({
      moodScale: selectedScale,
      triggerTag: selectedTag,
      note: note.trim() || undefined,
      entryDate: todayStr,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Chart Data preparation (Sort chronological for chart)
  const chartData = useMemo(() => {
    const sorted = [...moodEntries].sort((a, b) => (a.entryDate > b.entryDate ? 1 : -1));
    return sorted.slice(-14).map((entry) => {
      const dateObj = new Date(entry.entryDate);
      const formattedDate = dateObj.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
      });
      return {
        date: formattedDate,
        rawDate: entry.entryDate,
        mood: entry.moodScale,
        label: MOOD_OPTIONS.find((o) => o.scale === entry.moodScale)?.label || "",
        tag: entry.triggerTag || "Umum",
      };
    });
  }, [moodEntries]);

  // Average mood calculation
  const averageMood = useMemo(() => {
    if (moodEntries.length === 0) return 3;
    const sum = moodEntries.reduce((acc, curr) => acc + curr.moodScale, 0);
    return (sum / moodEntries.length).toFixed(1);
  }, [moodEntries]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sage-50 border border-sage-200 px-3 py-1 text-xs font-semibold text-sage-700 mb-2">
          <HeartIcon className="w-3.5 h-3.5" />
          <span>Self-Awareness Tool</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Mood Tracker Harian
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Mengenali naik-turun emosimu adalah langkah awal untuk merawat diri. Catat secara jujur tanpa rasa bersalah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm flex flex-col justify-between">
          <form onSubmit={handleSaveMood} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-3">
                1. Bagaimana perasaanmu hari ini?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {MOOD_OPTIONS.map((opt) => {
                  const isSelected = selectedScale === opt.scale;
                  return (
                    <button
                      type="button"
                      key={opt.scale}
                      onClick={() => setSelectedScale(opt.scale)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? `${opt.bg} ring-2 ring-sage-600 scale-105 shadow-sm`
                          : "bg-mist-50 border-ink-200 hover:border-sage-300 hover:bg-white"
                      }`}
                    >
                      <span className="text-3xl mb-1">{opt.emoji}</span>
                      <span className="text-[10px] font-semibold text-ink-800 text-center leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2">
                2. Apa pemicu utama mood ini?
              </label>
              <div className="flex flex-wrap gap-2">
                {TRIGGER_TAGS.map((tag) => {
                  const isTagSelected = selectedTag === tag;
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isTagSelected
                          ? "bg-sage-600 border-sage-600 text-white shadow-xs"
                          : "bg-mist-50 border-ink-200 text-ink-700 hover:bg-white hover:border-sage-400"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="mood-note" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                  3. Catatan singkat (opsional)
                </label>
                <span className="text-[10px] text-ink-500 font-mono">
                  {note.length}/200
                </span>
              </div>
              <textarea
                id="mood-note"
                rows={3}
                maxLength={200}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ceritakan sedikit momen yang membuatmu merasakan hal ini..."
                className="w-full rounded-2xl border border-ink-200 p-3 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
            </div>

            {saveSuccess && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-emerald-600" />
                <span>Mood hari ini berhasil dicatat!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-sage-600 py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sage-700 transition-colors cursor-pointer"
            >
              {existingToday ? "Perbarui Mood Hari Ini" : "Simpan Mood Hari Ini"}
            </button>
          </form>
        </div>

        {/* Right Column: Visualization Trends & Pattern Highlight (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Chart Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="font-display text-lg text-ink-900">Tren Mood 14 Hari Terakhir</h2>
                <p className="text-xs text-ink-500">Skala 1 (Sangat Buruk) hingga 5 (Sangat Baik)</p>
              </div>
              <div className="flex items-center gap-2 bg-mist-100 px-3 py-1.5 rounded-xl border border-ink-200">
                <span className="text-xs text-ink-700">Rata-rata:</span>
                <span className="text-sm font-bold text-sage-700 font-mono">{averageMood} / 5.0</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4A6C6F" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4A6C6F" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} tickLine={false} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: "#6B7280" }} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-ink-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                            <div className="font-semibold text-honey-400">{data.date}</div>
                            <div>Mood: <strong>{data.label}</strong> ({data.mood}/5)</div>
                            <div className="text-ink-200">Pemicu: {data.tag}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#4A6C6F"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#moodGradient)"
                    dot={{ fill: "#4A6C6F", r: 4 }}
                    activeDot={{ r: 6, fill: "#E3B778" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pattern Insight Box */}
            <div className="mt-6 rounded-2xl bg-sage-50/70 border border-sage-200 p-4 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="text-xs text-ink-800 leading-relaxed">
                <strong>Highlight Pola:</strong> Dari catatanmu, emosimu paling sering dipicu oleh faktor{" "}
                <span className="font-semibold text-sage-700">Akademik</span> dan membaik ketika kamu menyempatkan waktu istirahat atau aktivitas fisik ringan.
              </div>
            </div>
          </div>

          {/* Recent Mood History List */}
          <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm">
            <h3 className="font-display text-base text-ink-900 mb-4">Riwayat Catatan Mood</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {moodEntries.map((entry) => {
                const opt = MOOD_OPTIONS.find((o) => o.scale === entry.moodScale) || MOOD_OPTIONS[2];
                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-mist-50 border border-ink-200 hover:bg-white transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink-900">{opt.label}</span>
                          {entry.triggerTag && (
                            <span className="bg-ink-200/60 text-ink-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                              {entry.triggerTag}
                            </span>
                          )}
                        </div>
                        {entry.note && (
                          <p className="text-ink-700 text-[11px] mt-0.5 line-clamp-1">{entry.note}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-ink-500 font-mono text-[11px]">{entry.entryDate}</span>
                      <button
                        onClick={() => deleteMoodEntry(entry.id)}
                        className="text-ink-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Hapus entri"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
