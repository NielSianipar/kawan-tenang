"use client";

import Link from "next/link";
import { PhoneCallIcon, WindIcon, HeartIcon } from "@/components/common/Icons";

const CHANNELS = [
  {
    name: "Layanan Sejiwa (Kemenkes RI)",
    contact: "119 ext. 8",
    href: "tel:119",
    actionLabel: "Panggil 119 ext. 8",
    badge: "24 Jam • Gratis",
    desc: "Layanan tanggap darurat dan konseling krisis psikologis resmi nasional dari Kementerian Kesehatan RI.",
    isPrimary: true,
  },
  {
    name: "Into The Light Indonesia",
    contact: "Situs & Panduan Pencegahan Bunuh Diri",
    href: "https://www.intothelightid.org",
    actionLabel: "Buka intothelightid.org →",
    badge: "Edukasi & Rujukan",
    desc: "Komunitas riset dan advokasi pencegahan bunuh diri serta kesehatan jiwa untuk remaja & orang muda.",
    isPrimary: false,
  },
  {
    name: "Layanan LISA (Love Inside Suicide Awareness)",
    contact: "Pendampingan Krisis Psikososial",
    href: "https://www.intothelightid.org/mendapatkan-bantuan/",
    actionLabel: "Lihat Jadwal Hotline →",
    badge: "Sukarela & Rahasia",
    desc: "Layanan pendampingan psikososial berbasis non-penghakiman untuk mereka yang sedang dalam situasi keputusasaan.",
    isPrimary: false,
  },
  {
    name: "Yayasan Pulih (Trauma Recovery)",
    contact: "+62 811-8436-633",
    href: "https://wa.me/628118436633",
    actionLabel: "Chat WhatsApp Yayasan Pulih →",
    badge: "Konseling & Trauma",
    desc: "Bantuan dan penanganan trauma psikologis, kekerasan emosional, dan pemulihan kesehatan jiwa.",
    isPrimary: false,
  },
];

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-mist-100 px-4 sm:px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 hover:text-ink-900 transition-colors"
          >
            <span>← Kembali ke Dashboard</span>
          </Link>
          <span className="font-display text-lg tracking-tight text-ink-900">Ruang</span>
        </div>

        {/* Hero header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 mb-3">
            <span className="animate-pulse">●</span>
            <span>Jalur Bantuan & Hotline Krisis Segera</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
            Kamu tidak sendirian. Nafas dulu pelan-pelan.
          </h1>

          <p className="mt-3 text-sm text-ink-700 leading-relaxed">
            Halaman ini selalu bisa diakses kapan saja tanpa perlu login. Jika kamu atau seseorang yang kamu kenal sedang merasa tertekan hebat atau berada dalam risiko bahaya langsung, silakan hubungi saluran bantuan di bawah ini.
          </p>

          <div className="mt-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-bold">
                Hotline Utama Nasional
              </span>
              <div className="text-base font-bold text-ink-900">
                Layanan SEJIWA Kemenkes (119 ext. 8)
              </div>
            </div>
            <a
              href="tel:119"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-6 py-3 transition-colors shadow-sm cursor-pointer"
            >
              <PhoneCallIcon className="w-4 h-4 text-white" />
              <span>Telepon 119 Sekarang</span>
            </a>
          </div>
        </div>

        {/* Channels List */}
        <h2 className="font-display text-lg text-ink-900 mb-4">Saluran Bantuan Terpercaya Lainnya</h2>
        <div className="space-y-4">
          {CHANNELS.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl bg-white p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-display text-base font-semibold text-ink-900">{c.name}</h3>
                  <span className="text-[10px] font-semibold text-sage-700 bg-sage-50 border border-sage-200 px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                </div>
                <p className="text-xs text-ink-600 leading-relaxed mb-4">{c.desc}</p>
              </div>

              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-mist-100 hover:bg-sage-50 hover:text-sage-700 text-ink-800 text-xs font-semibold transition-colors border border-ink-200"
              >
                {c.actionLabel}
              </a>
            </div>
          ))}
        </div>

        {/* Quick Grounding Banner */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 to-white p-6 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl">
              🫁
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-ink-900">
                Merasa Jantung Berdegup Cepat atau Panik?
              </h4>
              <p className="text-[11px] text-ink-600">
                Coba latihan pernapasan Box Breathing atau Grounding 5-4-3-2-1 untuk menstabilkan diri.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/exercises"
            className="w-full sm:w-auto whitespace-nowrap rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 transition-colors text-center"
          >
            Buka Latihan Napas →
          </Link>
        </div>

        <p className="mt-8 text-center text-[11px] text-ink-500 leading-relaxed">
          Ruang adalah platform pendukung kesehatan mental dan bukan pengganti intervensi psikiatrik gawat darurat medis.
        </p>
      </div>
    </main>
  );
}
