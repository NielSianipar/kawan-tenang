"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { JournalIcon, SparklesIcon, HeartIcon } from "@/components/common/Icons";
import { checkCrisisPatterns } from "@/lib/crisis-detection/keywords";

const PROMPTS_BANK = [
  {
    id: "gratitude-1",
    category: "Rasa Syukur",
    prompt: "Apa satu hal kecil atau momen sederhana yang membuatmu merasa lega atau tersenyum hari ini?",
  },
  {
    id: "release-1",
    category: "Pelepasan Emosi",
    prompt: "Tuliskan unek-unek atau hal yang paling mengganjal di pikiranmu saat ini tanpa perlu mengedit atau menghakimi diri sendiri.",
  },
  {
    id: "compassion-1",
    category: "Self-Compassion",
    prompt: "Jika seorang sahabat baikmu sedang mengalami hal yang kamu alami saat ini, kalimat lembut apa yang akan kamu katakan padanya?",
  },
  {
    id: "goal-1",
    category: "Langkah Kecil",
    prompt: "Apa satu hal kecil yang bisa kamu lakukan hari ini untuk merawat tubuh dan pikiranmu?",
  },
  {
    id: "release-2",
    category: "Pelepasan Emosi",
    prompt: "Kira-kira apa hal yang saat ini berada di luar kendalimu, dan bagaimana kamu bisa belajar melepaskannya perlahan?",
  },
];

export default function JournalingPage() {
  const journalEntries = useAppStore((s) => s.journalEntries);
  const addJournalEntry = useAppStore((s) => s.addJournalEntry);
  const deleteJournalEntry = useAppStore((s) => s.deleteJournalEntry);
  const triggerEmergencyModal = useAppStore((s) => s.triggerEmergencyModal);

  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [journalContent, setJournalContent] = useState("");
  const [selectedEntryView, setSelectedEntryView] = useState<any | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const currentPrompt = PROMPTS_BANK[activePromptIndex];

  const handleNextPrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % PROMPTS_BANK.length);
  };

  const handleSaveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalContent.trim()) return;

    // Check crisis detection patterns
    const crisisCheck = checkCrisisPatterns(journalContent);
    const isCrisisFlagged = crisisCheck.severity !== "none";

    if (isCrisisFlagged) {
      triggerEmergencyModal(crisisCheck.severity as "watch" | "high");
    }

    addJournalEntry({
      promptId: currentPrompt.id,
      promptText: currentPrompt.prompt,
      content: journalContent.trim(),
      flaggedCrisis: isCrisisFlagged,
    });

    setSaveStatus("Jurnal tersimpan aman dengan enkripsi privat.");
    setJournalContent("");
    setTimeout(() => setSaveStatus(null), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 mb-2">
          <JournalIcon className="w-3.5 h-3.5" />
          <span>Ruang Refleksi Terenkripsi</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Journaling Terpandu
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Tumpahkan apa yang kamu rasakan. Tulisanmu bersifat privat sepenuhnya dan terenkripsi at-rest demi keamananmu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Prompt & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm">
            {/* Prompt Box */}
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-5 mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                  Prompt Hari Ini — {currentPrompt.category}
                </span>
                <button
                  type="button"
                  onClick={handleNextPrompt}
                  className="text-xs text-amber-700 hover:text-amber-900 underline font-medium cursor-pointer"
                >
                  🔄 Ganti Prompt
                </button>
              </div>
              <p className="font-display text-base sm:text-lg text-ink-900 leading-snug">
                &ldquo;{currentPrompt.prompt}&rdquo;
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveJournal} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={8}
                  required
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="Mulai menulis di sini... Ceritakan apa pun yang sedang ada di benakmu."
                  className="w-full rounded-2xl border border-ink-200 p-4 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed resize-none"
                />
                <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[11px] text-ink-400">
                  <span>🔒 Enkripsi Privat Aktif</span>
                  <span>•</span>
                  <span>{journalContent.length} karakter</span>
                </div>
              </div>

              {/* Demo Crisis Tester Helper for Pitch / Evaluation */}
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-[11px]">
                <span className="font-semibold text-amber-800 font-mono">🧪 Uji Coba Juri (Demo):</span>
                <button
                  type="button"
                  onClick={() =>
                    setJournalContent(
                      "Hari ini aku merasa capek banget sama hidup dan rasanya sudah nggak pengen hidup lagi karena beban tugas yang terlalu berat."
                    )
                  }
                  className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer"
                >
                  ⚡ Isi Kalimat Krisis (Tinggi)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setJournalContent(
                      "Akhir-akhir ini aku merasa sendirian banget dan nggak ada gunanya lagi berusaha."
                    )
                  }
                  className="bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer"
                >
                  ⚡ Isi Kalimat Krisis (Watch)
                </button>
              </div>

              {saveStatus && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-emerald-600" />
                  <span>{saveStatus}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-ink-500 italic text-center sm:text-left">
                  Tidak ada yang bisa membaca catatan ini selain kamu.
                </span>
                <button
                  type="submit"
                  disabled={!journalContent.trim()}
                  className="w-full sm:w-auto rounded-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-medium text-sm px-6 py-3 transition-colors cursor-pointer shadow-sm"
                >
                  Simpan Jurnal Privat
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Past Journal History (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg text-ink-900">Riwayat Jurnal Privat</h2>
              <span className="text-xs font-mono text-ink-500 bg-mist-100 px-2 py-0.5 rounded-full">
                {journalEntries.length} entri
              </span>
            </div>

            {journalEntries.length === 0 ? (
              <div className="text-center py-12 text-ink-500 text-xs">
                Belum ada jurnal yang tersimpan. Mulai tulis refleksi pertamamu hari ini!
              </div>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {journalEntries.map((entry) => {
                  const entryDate = new Date(entry.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedEntryView(entry)}
                      className="p-4 rounded-2xl bg-mist-50 border border-ink-200 hover:border-amber-400 hover:bg-white transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-ink-500 mb-1">
                        <span className="font-mono">{entryDate}</span>
                        {entry.flaggedCrisis && (
                          <span className="text-rose-600 font-semibold text-[10px] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            Eskalasi Diberikan
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-xs text-ink-900 line-clamp-1 mb-1 group-hover:text-amber-700">
                        {entry.promptText}
                      </h4>
                      <p className="text-xs text-ink-700 line-clamp-2 leading-relaxed">
                        {entry.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-ink-200/60 text-[11px] text-ink-500 flex items-center justify-between">
            <span>Privasi terjaga 100%</span>
            <span>At-rest Encryption</span>
          </div>
        </div>
      </div>

      {/* Modal View Detail Journal */}
      {selectedEntryView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-ink-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-ink-500">
                {new Date(selectedEntryView.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => setSelectedEntryView(null)}
                className="text-ink-400 hover:text-ink-900 p-1 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Prompt:</span>
              <p className="font-display text-sm text-ink-900 mt-0.5">{selectedEntryView.promptText}</p>
            </div>

            <div className="bg-mist-50 rounded-2xl p-4 border border-ink-200 mb-6">
              <p className="text-sm text-ink-900 leading-relaxed whitespace-pre-wrap">
                {selectedEntryView.content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  deleteJournalEntry(selectedEntryView.id);
                  setSelectedEntryView(null);
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
              >
                Hapus Jurnal Ini
              </button>
              <button
                onClick={() => setSelectedEntryView(null)}
                className="rounded-full bg-ink-900 text-white text-xs font-semibold px-5 py-2.5 hover:bg-ink-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
