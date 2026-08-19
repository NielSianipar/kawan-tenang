"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ShieldAlertIcon, HeartIcon, SparklesIcon } from "@/components/common/Icons";

const SCREENING_QUESTIONS = [
  {
    id: 1,
    category: "GAD-7",
    question: "Merasa gugup, cemas, atau gelisah tanpa alasan yang jelas?",
  },
  {
    id: 2,
    category: "GAD-7",
    question: "Sulit menghentikan atau mengendalikan rasa khawatir yang berlebihan?",
  },
  {
    id: 3,
    category: "GAD-7",
    question: "Merasa sangat gelisah hingga sulit untuk duduk diam atau santai?",
  },
  {
    id: 4,
    category: "GAD-7",
    question: "Mudah merasa jengkel, lelah secara emosional, atau cepat tersinggung?",
  },
  {
    id: 5,
    category: "PHQ-9",
    question: "Kurang berminat atau kurang menikmati hal-hal yang biasanya kamu sukai?",
  },
  {
    id: 6,
    category: "PHQ-9",
    question: "Merasa murung, sedih, atau merasa tidak memiliki harapan?",
  },
  {
    id: 7,
    category: "PHQ-9",
    question: "Merasa lelah atau kekurangan energi meski tidak banyak aktivitas fisik?",
  },
  {
    id: 8,
    category: "PHQ-9",
    question: "Merasa buruk tentang diri sendiri — merasa gagal atau mengecewakan orang lain?",
  },
];

const SCALE_OPTIONS = [
  { label: "Tidak pernah", value: 0 },
  { label: "Beberapa hari", value: 1 },
  { label: "Lebih dari separuh waktu", value: 2 },
  { label: "Hampir setiap hari", value: 3 },
];

export default function OnboardingPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const saveScreeningResult = useAppStore((s) => s.saveScreeningResult);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(SCREENING_QUESTIONS.length).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    category: "rendah" | "sedang" | "tinggi";
  } | null>(null);

  const handleSelectOption = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);

    if (currentIndex < SCREENING_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate total score
      const totalScore = newAnswers.reduce((sum, val) => sum + (val >= 0 ? val : 0), 0);
      let category: "rendah" | "sedang" | "tinggi" = "rendah";
      if (totalScore >= 15) {
        category = "tinggi";
      } else if (totalScore >= 8) {
        category = "sedang";
      }

      setScoreResult({ score: totalScore, category });
      saveScreeningResult(totalScore, category, newAnswers);
      setIsCompleted(true);
    }
  };

  const handleSkip = () => {
    saveScreeningResult(0, "rendah", new Array(SCREENING_QUESTIONS.length).fill(0));
    router.push("/dashboard");
  };

  const progressPercent = Math.round(((currentIndex + 1) / SCREENING_QUESTIONS.length) * 100);

  return (
    <main className="min-h-screen bg-mist-100 flex flex-col justify-between p-4 md:p-8">
      {/* Header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between py-2">
        <span className="font-display text-xl tracking-tight text-ink-900">Ruang</span>
        <button
          onClick={handleSkip}
          className="text-xs text-ink-500 hover:text-ink-700 underline font-medium cursor-pointer"
        >
          Lewati untuk sekarang
        </button>
      </header>

      {/* Main Questionnaire Box */}
      <div className="max-w-2xl mx-auto w-full my-auto py-6">
        {!isCompleted ? (
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-ink-900/5 border border-ink-200">
            {/* Disclaimer pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage-50 px-3.5 py-1 text-xs text-sage-700 border border-sage-100">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Skrining Refleksi Awal (Bukan Diagnosis Medis)</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-ink-200/50 rounded-full h-1.5 mb-6 overflow-hidden">
              <div
                className="bg-sage-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-ink-500 mb-4 font-mono">
              <span>Pertanyaan {currentIndex + 1} dari {SCREENING_QUESTIONS.length}</span>
              <span>Dalam 2 minggu terakhir...</span>
            </div>

            {/* Question */}
            <h1 className="font-display text-xl md:text-2xl text-ink-900 leading-snug mb-8 min-h-[64px]">
              {SCREENING_QUESTIONS[currentIndex].question}
            </h1>

            {/* Options */}
            <div className="space-y-3">
              {SCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    answers[currentIndex] === opt.value
                      ? "border-sage-600 bg-sage-50/70 text-sage-900 font-medium"
                      : "border-ink-200 hover:border-sage-400 hover:bg-mist-50 text-ink-700"
                  }`}
                >
                  <span className="text-sm md:text-base">{opt.label}</span>
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono transition-colors ${
                      answers[currentIndex] === opt.value
                        ? "border-sage-600 bg-sage-600 text-white"
                        : "border-ink-200 group-hover:border-sage-400 text-ink-500"
                    }`}
                  >
                    {opt.value}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation footer within card */}
            <div className="mt-8 pt-4 border-t border-ink-200/60 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-medium text-ink-500 hover:text-ink-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Sebelumnya
              </button>
              <span className="text-[11px] text-ink-500 italic">
                Jawabanmu tersimpan privat dan hanya digunakan untuk personalisasi ruangmu.
              </span>
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-ink-900/5 border border-ink-200 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-sage-50 flex items-center justify-center text-sage-600 mb-4 border border-sage-100">
              <HeartIcon className="w-8 h-8" />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-honey-600 font-semibold">
              Hasil Refleksi Awal
            </span>

            <h2 className="font-display text-2xl text-ink-900 mt-2 mb-3">
              {scoreResult?.category === "rendah" && "Kondisimu Relatif Stabil & Ringan"}
              {scoreResult?.category === "sedang" && "Tampaknya Kamu Sedang Cukup Tertekan"}
              {scoreResult?.category === "tinggi" && "Beban Emosionalmu Sedang Cukup Berat"}
            </h2>

            <div className="max-w-md mx-auto text-sm text-ink-700 leading-relaxed mb-6">
              {scoreResult?.category === "rendah" && (
                <p>
                  Secara umum kamu memiliki daya lentur yang baik saat ini. Platform ini akan membantumu menjaga kebiasaan refleksi positif dan mengenali pola emosi harianmu.
                </p>
              )}
              {scoreResult?.category === "sedang" && (
                <p>
                  Wajar sekali jika akhir-akhir ini terasa melelahkan. Ruang ini siap menemanimu melalui journaling terpandu, peer support yang terarah, dan latihan pernapasan grounding.
                </p>
              )}
              {scoreResult?.category === "tinggi" && (
                <p>
                  Terima kasih sudah jujur pada dirimu sendiri. Kami ingin memastikan kamu tidak menanggung ini sendirian. Selain alat mandiri di aplikasi ini, kami sangat menyarankan untuk terhubung dengan konseling profesional.
                </p>
              )}
            </div>

            {/* Score summary badge */}
            <div className="inline-flex items-center gap-3 bg-mist-100 px-4 py-2 rounded-xl text-xs text-ink-700 mb-8 border border-ink-200">
              <span>Total Skor Skrining: <strong className="font-mono">{scoreResult?.score}/24</strong></span>
              <span>•</span>
              <span className="capitalize font-semibold text-sage-700">Kategori: {scoreResult?.category}</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {scoreResult?.category === "tinggi" && (
                <Link
                  href="/dashboard/directory"
                  className="w-full sm:w-auto rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm px-6 py-3.5 transition-colors shadow-sm"
                >
                  Lihat Direktori Bantuan Profesional →
                </Link>
              )}
              <Link
                href="/dashboard"
                className="w-full sm:w-auto rounded-full bg-sage-600 hover:bg-sage-700 text-white font-medium text-sm px-8 py-3.5 transition-colors shadow-sm"
              >
                Masuk ke Dashboard Utama →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <footer className="max-w-2xl mx-auto w-full text-center text-xs text-ink-500 py-4">
        Skrining ini diadaptasi dari PHQ-9 & GAD-7 untuk refleksi diri dan tidak menggantikan pemeriksaan psikologis klinis.
      </footer>
    </main>
  );
}
