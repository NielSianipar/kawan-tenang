"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { WindIcon, SparklesIcon, HeartIcon } from "@/components/common/Icons";

export default function MicroCBTExercisesPage() {
  const addCBTRecord = useAppStore((s) => s.addCBTRecord);
  const cbtRecords = useAppStore((s) => s.cbtRecords);

  const [activeTab, setActiveTab] = useState<"breathing" | "grounding" | "reframing">("breathing");

  // Box breathing states
  const [breathingPhase, setBreathingPhase] = useState<"Tarik Napas" | "Tahan" | "Hembuskan" | "Tahan Kosong">("Tarik Napas");
  const [breathingSeconds, setBreathingSeconds] = useState(4);
  const [isBreathingRunning, setIsBreathingRunning] = useState(false);
  const [cyclesCount, setCyclesCount] = useState(0);

  // Grounding 5-4-3-2-1 states
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState<string[]>(["", "", "", "", ""]);
  const [groundingCompleted, setGroundingCompleted] = useState(false);

  // Cognitive Reframing states
  const [reframingStep, setReframingStep] = useState(1);
  const [automaticThought, setAutomaticThought] = useState("");
  const [evidenceAnalysis, setEvidenceAnalysis] = useState("");
  const [balancedThought, setBalancedThought] = useState("");
  const [reframingCompleted, setReframingCompleted] = useState(false);

  // Box Breathing Loop
  useEffect(() => {
    if (!isBreathingRunning) return;

    const phases: Array<"Tarik Napas" | "Tahan" | "Hembuskan" | "Tahan Kosong"> = [
      "Tarik Napas",
      "Tahan",
      "Hembuskan",
      "Tahan Kosong",
    ];

    const timer = setInterval(() => {
      setBreathingSeconds((prev) => {
        if (prev <= 1) {
          setBreathingPhase((currPhase) => {
            const nextIdx = (phases.indexOf(currPhase) + 1) % phases.length;
            if (nextIdx === 0) {
              setCyclesCount((c) => c + 1);
            }
            return phases[nextIdx];
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingRunning]);

  const handleFinishBreathing = () => {
    setIsBreathingRunning(false);
    addCBTRecord({
      type: "breathing",
      notes: `Menyelesaikan ${cyclesCount} siklus pernapasan kotak.`,
    });
  };

  const handleFinishGrounding = () => {
    setGroundingCompleted(true);
    addCBTRecord({
      type: "grounding",
      notes: "Menyelesaikan latihan grounding 5-4-3-2-1 panca indera.",
      data: groundingInputs,
    });
  };

  const handleFinishReframing = () => {
    setReframingCompleted(true);
    addCBTRecord({
      type: "reframing",
      notes: "Menyelesaikan lembar cognitive reframing.",
      data: { automaticThought, evidenceAnalysis, balancedThought },
    });
  };

  const GROUNDING_STEPS = [
    { count: 5, prompt: "Sebutkan 5 benda yang kamu LIHAT di sekitarmu sekarang.", icon: "👁️", placeholder: "Contoh: Buku, lampu meja, jendela..." },
    { count: 4, prompt: "Sebutkan 4 hal yang bisa kamu SENTUH atau rasakan di tubuhmu.", icon: "✋", placeholder: "Contoh: Sandaran kursi, kain baju, lantai..." },
    { count: 3, prompt: "Sebutkan 3 SUARA yang bisa kamu dengar di ruangan ini.", icon: "👂", placeholder: "Contoh: Suara AC, angin luar, detak jam..." },
    { count: 2, prompt: "Sebutkan 2 AROMA yang bisa kamu cium saat ini.", icon: "👃", placeholder: "Contoh: Aroma kopi, wangi sabun..." },
    { count: 1, prompt: "Sebutkan 1 rasa atau hal positif yang kamu SYUKURI dari dirimu.", icon: "❤️", placeholder: "Contoh: Aku bersyukur tubuhku kuat hari ini..." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
          <WindIcon className="w-3.5 h-3.5" />
          <span>Evidence-Based Self Help</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Micro-CBT & Grounding Exercises
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Latihan psikologis berbasis bukti selama 2–5 menit untuk meredakan kecemasan akut, menurunkan detak jantung, dan meluruskan distorsi pikiran.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-ink-200 pb-4">
        <button
          onClick={() => setActiveTab("breathing")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "breathing"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-ink-700 hover:bg-mist-100 border border-ink-200"
          }`}
        >
          <span>💨</span>
          <span>Box Breathing (4-4-4-4)</span>
        </button>

        <button
          onClick={() => setActiveTab("grounding")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "grounding"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-ink-700 hover:bg-mist-100 border border-ink-200"
          }`}
        >
          <span>🖐️</span>
          <span>Grounding 5-4-3-2-1</span>
        </button>

        <button
          onClick={() => setActiveTab("reframing")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "reframing"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-ink-700 hover:bg-mist-100 border border-ink-200"
          }`}
        >
          <span>🧠</span>
          <span>Cognitive Reframing</span>
        </button>
      </div>

      {/* Exercise Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-ink-200 shadow-sm flex flex-col justify-between min-h-[480px]">
          {/* TAB 1: Box Breathing */}
          {activeTab === "breathing" && (
            <div className="flex flex-col items-center justify-center text-center space-y-8 my-auto">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold">
                  Teknik Pernapasan Kotak
                </span>
                <h2 className="font-display text-2xl text-ink-900 mt-1">
                  Atur Detak Jantung & Sistem Saraf
                </h2>
                <p className="text-xs text-ink-500 max-w-md mx-auto mt-1">
                  Ikuti ritme lingkaran. 4 detik tarik, 4 detik tahan, 4 detik hembuskan, 4 detik jeda.
                </p>
              </div>

              {/* Animated Circle */}
              <div className="relative flex h-60 w-60 items-center justify-center">
                <div
                  className={`absolute h-60 w-60 rounded-full transition-all duration-1000 ${
                    isBreathingRunning
                      ? breathingPhase === "Tarik Napas"
                        ? "bg-indigo-200/80 scale-110"
                        : breathingPhase === "Hembuskan"
                        ? "bg-indigo-100/40 scale-85"
                        : "bg-indigo-100/60 scale-100"
                      : "bg-indigo-50"
                  }`}
                />
                <div className="relative flex flex-col items-center justify-center rounded-full bg-white shadow-lg w-40 h-40 border border-indigo-100">
                  <span className="font-display text-base font-semibold text-indigo-900">
                    {isBreathingRunning ? breathingPhase : "Siap?"}
                  </span>
                  <span className="font-mono text-3xl font-bold text-indigo-600 mt-1">
                    {isBreathingRunning ? breathingSeconds : "4s"}
                  </span>
                  {isBreathingRunning && (
                    <span className="text-[10px] text-ink-400 mt-1 font-mono">
                      Siklus #{cyclesCount + 1}
                    </span>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {!isBreathingRunning ? (
                  <button
                    onClick={() => {
                      setIsBreathingRunning(true);
                      setCyclesCount(0);
                    }}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    Mulai Latihan Napas
                  </button>
                ) : (
                  <button
                    onClick={handleFinishBreathing}
                    className="rounded-full bg-ink-900 hover:bg-ink-800 text-white px-8 py-3.5 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    Selesai & Simpan Progres
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Grounding 5-4-3-2-1 */}
          {activeTab === "grounding" && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold">
                  Teknik Grounding Sensorik
                </span>
                <h2 className="font-display text-2xl text-ink-900 mt-1">
                  Kembalikan Fokus ke Saat Ini (Here & Now)
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Latihan ini memutus rantai pikiran panik dengan mengaktifkan kelima panca indera.
                </p>
              </div>

              {!groundingCompleted ? (
                <div className="bg-mist-50 rounded-2xl p-6 border border-ink-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{GROUNDING_STEPS[groundingStep].icon}</span>
                    <div>
                      <div className="font-mono text-xs font-bold text-indigo-600">
                        Langkah {groundingStep + 1} dari 5
                      </div>
                      <h3 className="font-display text-base text-ink-900">
                        {GROUNDING_STEPS[groundingStep].prompt}
                      </h3>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={groundingInputs[groundingStep]}
                    onChange={(e) => {
                      const updated = [...groundingInputs];
                      updated[groundingStep] = e.target.value;
                      setGroundingInputs(updated);
                    }}
                    placeholder={GROUNDING_STEPS[groundingStep].placeholder}
                    className="w-full rounded-xl border border-ink-200 bg-white p-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={groundingStep === 0}
                      onClick={() => setGroundingStep((s) => s - 1)}
                      className="text-xs font-semibold text-ink-500 hover:text-ink-900 disabled:opacity-30"
                    >
                      ← Sebelumnya
                    </button>

                    {groundingStep < 4 ? (
                      <button
                        onClick={() => setGroundingStep((s) => s + 1)}
                        className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold transition-colors"
                      >
                        Lanjut Langkah Berikutnya →
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishGrounding}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 text-xs font-semibold transition-colors"
                      >
                        Selesaikan Grounding ✓
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-2xl border border-emerald-200">
                    ✓
                  </div>
                  <h3 className="font-display text-xl text-ink-900">
                    Luar Biasa! Pikiranmu Sekarang Lebih Membumi
                  </h3>
                  <p className="text-xs text-ink-600 max-w-md mx-auto">
                    Tubuhmu ada di sini dan kamu aman saat ini. Latihan ini telah tercatat dalam riwayat refleksi.
                  </p>
                  <button
                    onClick={() => {
                      setGroundingCompleted(false);
                      setGroundingStep(0);
                      setGroundingInputs(["", "", "", "", ""]);
                    }}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-xs font-semibold"
                  >
                    Ulangi Latihan
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Cognitive Reframing */}
          {activeTab === "reframing" && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold">
                  Cognitive Reframing (CBT)
                </span>
                <h2 className="font-display text-2xl text-ink-900 mt-1">
                  Uji Kebenaran Pikiran Negatif
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Pikiran kita bukan selalu fakta. Pisahkan asumsi dari kenyataan untuk menemukan perspektif yang lebih adil bagi dirimu.
                </p>
              </div>

              {!reframingCompleted ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
                      1. Apa pikiran negatif otomatis yang sedang mengganggumu?
                    </label>
                    <input
                      type="text"
                      value={automaticThought}
                      onChange={(e) => setAutomaticThought(e.target.value)}
                      placeholder="Contoh: 'Semua orang pasti menganggap presentasiku tadi sangat gagal.'"
                      className="w-full rounded-xl border border-ink-200 p-3 text-xs sm:text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
                      2. Apa bukti nyata yang mendukung vs membantah pikiran ini?
                    </label>
                    <textarea
                      rows={3}
                      value={evidenceAnalysis}
                      onChange={(e) => setEvidenceAnalysis(e.target.value)}
                      placeholder="Contoh: 'Faktanya ada beberapa poin yang diapresiasi dosen, dan tidak ada yang menertawakan. Rasa maluku adalah emosi, bukan bukti kegagalan.'"
                      className="w-full rounded-xl border border-ink-200 p-3 text-xs sm:text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
                      3. Perspektif baru yang lebih seimbang & penuh welas asih:
                    </label>
                    <input
                      type="text"
                      value={balancedThought}
                      onChange={(e) => setBalancedThought(e.target.value)}
                      placeholder="Contoh: 'Aku sudah berusaha sebaik mungkin, dan wajar jika ada sedikit kekurangan yang bisa diperbaiki nanti.'"
                      className="w-full rounded-xl border border-ink-200 p-3 text-xs sm:text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleFinishReframing}
                      disabled={!automaticThought || !balancedThought}
                      className="rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-6 py-3 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Simpan Perspektif Baru ✓
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-2xl border border-emerald-200">
                    🧠
                  </div>
                  <h3 className="font-display text-xl text-ink-900">
                    Pikiran Baru Berhasil Disimpan!
                  </h3>
                  <p className="text-xs text-ink-600 max-w-md mx-auto">
                    Membiasakan diri merefleksikan pikiran negatif secara bertahap akan mengurangi kecemasan berlebihan.
                  </p>
                  <button
                    onClick={() => {
                      setReframingCompleted(false);
                      setAutomaticThought("");
                      setEvidenceAnalysis("");
                      setBalancedThought("");
                    }}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-xs font-semibold"
                  >
                    Tantang Pikiran Lain
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: CBT History & Explanations (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm">
            <h3 className="font-display text-base text-ink-900 mb-3">Riwayat Latihan CBT</h3>
            {cbtRecords.length === 0 ? (
              <p className="text-xs text-ink-500">Belum ada latihan yang diselesaikan.</p>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {cbtRecords.map((rec) => (
                  <div key={rec.id} className="p-3 rounded-xl bg-mist-50 border border-ink-200 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-ink-400 font-mono mb-1">
                      <span className="uppercase font-bold text-indigo-700">{rec.type}</span>
                      <span>{new Date(rec.completedAt).toLocaleDateString("id-ID")}</span>
                    </div>
                    <p className="text-ink-700 text-[11px]">{rec.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-3xl p-6 border border-indigo-200 shadow-sm text-xs text-ink-700 space-y-2">
            <span className="font-bold text-indigo-900">Mengapa Micro-CBT Bekerja?</span>
            <p className="leading-relaxed">
              CBT (Cognitive Behavioral Therapy) adalah metode berbasis bukti emas untuk menata pola pikir dan memutus siklus cemas tanpa perlu mengonsumsi obat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
