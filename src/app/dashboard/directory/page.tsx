"use client";

import { useState, useMemo } from "react";
import { DirectoryIcon, PhoneCallIcon, SparklesIcon } from "@/components/common/Icons";

interface ProfessionalService {
  id: string;
  name: string;
  type: "Lembaga Resmi" | "Biro Psikologi" | "Layanan Komunitas" | "Fasilitas Publik" | "Lembaga Komunitas";
  specialization: string;
  city: string;
  mode: "Online" | "Offline" | "Keduanya";
  priceRange: "Gratis / BPJS" | "Terjangkau (< 150rb)" | "Standar (150rb - 350rb)";
  contactInfo: string;
  phoneOrWA: string;
  description: string;
  isDemoData: boolean;
}

const DIRECTORY_DATA: ProfessionalService[] = [
  {
    id: "dir-1",
    name: "Layanan Kesehatan Jiwa SEJIWA (Kemenkes RI)",
    type: "Lembaga Resmi",
    specialization: "Krisis Akut, Stres, Konseling Awal",
    city: "Nasional (Seluruh Indonesia)",
    mode: "Online",
    priceRange: "Gratis / BPJS",
    contactInfo: "Hotline 119 ext. 8",
    phoneOrWA: "119",
    description: "Layanan tanggap darurat dan konseling awal kesehatan mental resmi dari Kementerian Kesehatan RI bebas biaya.",
    isDemoData: true,
  },
  {
    id: "dir-2",
    name: "Layanan Psikolog Puskesmas (Dinkes)",
    type: "Fasilitas Publik",
    specialization: "Kecemasan, Masalah Belajar, Konseling Umum",
    city: "Jabodetabek / Kota Besar",
    mode: "Offline",
    priceRange: "Gratis / BPJS",
    contactInfo: "Kunjungi Puskesmas Terdekat dengan BPJS",
    phoneOrWA: "",
    description: "Layanan konsultasi psikolog klinis tingkat pertama yang terintegrasi dengan BPJS Kesehatan.",
    isDemoData: true,
  },
  {
    id: "dir-3",
    name: "Yayasan Pulih — Trauma & Crisis Center",
    type: "Lembaga Resmi",
    specialization: "Trauma, Kekerasan, Pemulihan Emosional",
    city: "Jakarta & Online",
    mode: "Keduanya",
    priceRange: "Terjangkau (< 150rb)",
    contactInfo: "WhatsApp: +62 811-8436-633",
    phoneOrWA: "https://wa.me/628118436633",
    description: "Lembaga nirlaba yang berfokus pada penanganan trauma psikologis dan konseling berbiaya subsidi silang.",
    isDemoData: true,
  },
  {
    id: "dir-4",
    name: "Pusat Konseling Mahasiswa (PKM)",
    type: "Lembaga Resmi",
    specialization: "Burnout Akademik, Skripsi, Adaptasi Kampus",
    city: "Yogyakarta & Online",
    mode: "Keduanya",
    priceRange: "Gratis / BPJS",
    contactInfo: "Email: konseling@kampus.ac.id",
    phoneOrWA: "",
    description: "Layanan konseling sebaya dan psikolog kampus untuk mahasiswa aktif dalam mengatasi krisis akademik.",
    isDemoData: true,
  },
  {
    id: "dir-5",
    name: "Ruang Pulih Kawan Muda",
    type: "Biro Psikologi",
    specialization: "Quarter-Life Crisis, Hubungan Asmara, Self-Esteem",
    city: "Bandung & Online",
    mode: "Online",
    priceRange: "Standar (150rb - 350rb)",
    contactInfo: "WhatsApp: +62 812-3456-7890",
    phoneOrWA: "https://wa.me/6281234567890",
    description: "Kolektif psikolog muda yang menyediakan sesi konseling empatik dan ramah Gen Z via video call.",
    isDemoData: true,
  },
  {
    id: "dir-6",
    name: "Lembaga Konseling Lentera Jiwa",
    type: "Lembaga Komunitas",
    specialization: "Keluarga, Konflik Orang Tua, Cemas",
    city: "Surabaya & Online",
    mode: "Keduanya",
    priceRange: "Terjangkau (< 150rb)",
    contactInfo: "WhatsApp: +62 813-9876-5432",
    phoneOrWA: "https://wa.me/6281398765432",
    description: "Konseling psikologis berbasis komunitas dengan pendekatan hangat dan tarif sukarela.",
    isDemoData: true,
  },
];

export default function ProfessionalDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState<string>("Semua");
  const [selectedPrice, setSelectedPrice] = useState<string>("Semua");

  const filteredServices = useMemo(() => {
    return DIRECTORY_DATA.filter((item) => {
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMode = selectedMode === "Semua" || item.mode === selectedMode;
      const matchPrice = selectedPrice === "Semua" || item.priceRange === selectedPrice;

      return matchQuery && matchMode && matchPrice;
    });
  }, [searchQuery, selectedMode, selectedPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 mb-2">
          <DirectoryIcon className="w-3.5 h-3.5" />
          <span>Jalur Bantuan Profesional</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Direktori Layanan Bantuan Terverifikasi
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Menjembatani akses ke psikolog klinis, puskesmas, dan hotline resmi ketika kamu membutuhkan bimbingan profesional yang lebih intensif.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search text */}
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
              Cari Nama / Masalah / Kota
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="mis. Cemas, Jakarta, Pulih..."
              className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Filter Mode */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
              Metode Konsultasi
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Semua">Semua Metode (Online & Offline)</option>
              <option value="Online">Online Saja</option>
              <option value="Offline">Tatap Muka (Offline)</option>
              <option value="Keduanya">Online & Offline</option>
            </select>
          </div>

          {/* Filter Price */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
              Kisaran Biaya
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Semua">Semua Rentang Harga</option>
              <option value="Gratis / BPJS">Gratis / Dicover BPJS</option>
              <option value="Terjangkau (< 150rb)">Terjangkau (&lt; 150rb)</option>
              <option value="Standar (150rb - 350rb)">Standar (150rb - 350rb)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl p-6 border border-ink-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {service.type}
                </span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  [Data Demo Lomba]
                </span>
              </div>

              <h3 className="font-display text-lg text-ink-900 mb-2 leading-snug">
                {service.name}
              </h3>

              <p className="text-xs text-ink-600 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Service Meta Specs */}
              <div className="space-y-1.5 text-xs text-ink-700 bg-mist-50 p-3 rounded-2xl border border-ink-200 mb-6">
                <div>🎯 <strong>Fokus:</strong> {service.specialization}</div>
                <div>📍 <strong>Lokasi:</strong> {service.city} ({service.mode})</div>
                <div>🏷️ <strong>Biaya:</strong> <span className="font-semibold text-emerald-700">{service.priceRange}</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              {service.phoneOrWA.startsWith("http") ? (
                <a
                  href={service.phoneOrWA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 transition-colors shadow-xs"
                >
                  <span>Hubungi via WhatsApp →</span>
                </a>
              ) : service.phoneOrWA === "119" ? (
                <a
                  href="tel:119"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2.5 transition-colors shadow-xs"
                >
                  <PhoneCallIcon className="w-4 h-4 text-white" />
                  <span>Panggil Hotline 119 ext. 8</span>
                </a>
              ) : (
                <div className="text-center p-2 rounded-xl bg-mist-100 text-[11px] font-mono text-ink-700">
                  {service.contactInfo}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-ink-200 p-6 text-xs text-ink-500">
          Tidak ditemukan layanan yang cocok dengan kriteria filter. Coba ubah filter atau kata kunci pencarianmu.
        </div>
      )}
    </div>
  );
}
