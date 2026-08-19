"use client";

import { useEffect, useRef } from "react";

interface CrisisModalProps {
  open: boolean;
  severity: "watch" | "high";
  onContinueAnyway: () => void;
  onClose: () => void;
}

/**
 * Modal ini SENGAJA tidak bisa ditutup dengan klik di luar area (backdrop),
 * supaya pesan & nomor bantuan pasti terbaca. Tapi tetap menyediakan opsi
 * "lanjutkan menulis" agar tidak terasa memaksa bagi user yang sedang
 * menulis refleksi/fiksi biasa.
 */
export function CrisisModal({ open, severity, onContinueAnyway, onClose }: CrisisModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="crisis-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl focus:outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        <h2 id="crisis-modal-title" className="font-display text-xl text-ink-900 mb-2">
          Sepertinya kamu sedang berat banget ya.
        </h2>
        <p className="text-ink-700 text-sm leading-relaxed mb-5">
          {severity === "high"
            ? "Apa yang kamu tulis membuat kami khawatir. Kamu tidak harus melewati ini sendirian — ada orang yang siap dengar dan bantu sekarang."
            : "Kami hanya ingin memastikan kamu baik-baik saja. Kalau kamu butuh cerita ke seseorang yang terlatih, ini selalu tersedia."}
        </p>

        <div className="space-y-2 mb-5">
          <a
            href="tel:119"
            className="flex items-center justify-between rounded-xl bg-sage-600 px-4 py-3 text-white font-medium hover:bg-sage-700 transition-colors"
          >
            Hubungi Layanan Sejiwa (119 ext. 8)
            <span aria-hidden>→</span>
          </a>
          <a
            href="/emergency"
            className="flex items-center justify-between rounded-xl border border-ink-200 px-4 py-3 text-ink-800 font-medium hover:bg-ink-50 transition-colors"
          >
            Lihat semua jalur bantuan
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          onClick={onContinueAnyway}
          className="w-full text-center text-sm text-ink-500 hover:text-ink-700 underline underline-offset-2"
        >
          Saya hanya sedang menulis refleksi, lanjutkan
        </button>
      </div>
    </div>
  );
}
