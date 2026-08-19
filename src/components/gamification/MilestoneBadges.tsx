"use client";

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { SparklesIcon } from "@/components/common/Icons";

export interface BadgeItem {
  id: string;
  icon: string;
  name: string;
  desc: string;
  unlocked: boolean;
  progressText: string;
}

export function MilestoneBadges() {
  const user = useAppStore((s) => s.user);
  const moodEntries = useAppStore((s) => s.moodEntries);
  const journalEntries = useAppStore((s) => s.journalEntries);
  const cbtRecords = useAppStore((s) => s.cbtRecords);
  const sessionHistory = useAppStore((s) => s.sessionHistory);

  const badges = useMemo<BadgeItem[]>(() => {
    const hasScreening = user?.onboardingCompleted || !!user?.screeningResult;
    const moodCount = moodEntries.length;
    const journalCount = journalEntries.length;
    const hasBreathing = cbtRecords.some((c) => c.type === "breathing");
    const hasGrounding = cbtRecords.some((c) => c.type === "grounding");
    const hasReframing = cbtRecords.some((c) => c.type === "reframing");
    const hasPeerChat = sessionHistory.length > 0;

    return [
      {
        id: "badge-onboarding",
        icon: "🌿",
        name: "Langkah Pertama",
        desc: "Menyelesaikan skrining awal dan membuka ruang personalmu.",
        unlocked: hasScreening,
        progressText: hasScreening ? "Terbuka ✓" : "Selesaikan skrining awal",
      },
      {
        id: "badge-mood-3",
        icon: "📊",
        name: "Pencatat Emosi",
        desc: "Mencatat setidaknya 3 entri mood untuk mengenali pola harian.",
        unlocked: moodCount >= 3,
        progressText: `${Math.min(moodCount, 3)}/3 entri mood`,
      },
      {
        id: "badge-journal-2",
        icon: "✍️",
        name: "Pelepas Beban",
        desc: "Menuliskan setidaknya 2 jurnal refleksi privat.",
        unlocked: journalCount >= 2,
        progressText: `${Math.min(journalCount, 2)}/2 jurnal`,
      },
      {
        id: "badge-breathing",
        icon: "🫁",
        name: "Napas Sadar",
        desc: "Menyelesaikan latihan pernapasan Box Breathing.",
        unlocked: hasBreathing,
        progressText: hasBreathing ? "Terbuka ✓" : "Coba Box Breathing",
      },
      {
        id: "badge-grounding",
        icon: "🖐️",
        name: "Membumi & Tenang",
        desc: "Menyelesaikan latihan sensorik Grounding 5-4-3-2-1.",
        unlocked: hasGrounding,
        progressText: hasGrounding ? "Terbuka ✓" : "Coba Grounding 5-4-3-2-1",
      },
      {
        id: "badge-reframing",
        icon: "🧠",
        name: "Pikiran Seimbang",
        desc: "Menantang distorsi pikiran dengan Cognitive Reframing.",
        unlocked: hasReframing,
        progressText: hasReframing ? "Terbuka ✓" : "Coba Reframing CBT",
      },
      {
        id: "badge-peer",
        icon: "💬",
        name: "Sahabat Empati",
        desc: "Menyelesaikan sesi berbagi cerita di Peer Support.",
        unlocked: hasPeerChat,
        progressText: hasPeerChat ? "Terbuka ✓" : "Ikuti 1 sesi peer support",
      },
    ];
  }, [user, moodEntries, journalEntries, cbtRecords, sessionHistory]);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-honey-600 mb-1">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Apresiasi Progres Diri</span>
          </div>
          <h3 className="font-display text-lg text-ink-900">
            Lencana Jejak Pemulihan
          </h3>
          <p className="text-xs text-ink-500">
            Apresiasi atas langkah kecil yang kamu ambil setiap hari untuk kesehatan mentalmu.
          </p>
        </div>

        <div className="bg-honey-50 border border-honey-200 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm">🏆</span>
          <span className="text-xs font-bold text-honey-700 font-mono">
            {unlockedCount} / {badges.length} Terbuka
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
              badge.unlocked
                ? "bg-amber-50/40 border-amber-200 shadow-xs"
                : "bg-mist-50/60 border-ink-200/70 opacity-60 grayscale-[0.4]"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                badge.unlocked
                  ? "bg-amber-100 border-amber-300 shadow-xs"
                  : "bg-ink-100 border-ink-200"
              }`}
            >
              {badge.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-xs text-ink-900 truncate">{badge.name}</h4>
                {badge.unlocked && (
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded-md">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ink-600 line-clamp-2 leading-relaxed mt-0.5">
                {badge.desc}
              </p>
              <div className="text-[10px] font-mono text-ink-500 mt-1.5">
                {badge.progressText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
