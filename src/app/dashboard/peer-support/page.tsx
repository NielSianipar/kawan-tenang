"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { PeerIcon, ShieldAlertIcon, SparklesIcon } from "@/components/common/Icons";
import { checkCrisisPatterns } from "@/lib/crisis-detection/keywords";

const TOPICS = [
  { id: "akademik", label: "Tekanan Akademik & Skripsi", emoji: "📚" },
  { id: "keluarga", label: "Konflik Keluarga & Ekspektasi", emoji: "🏠" },
  { id: "pertemanan", label: "Pertemanan & Hubungan", emoji: "👥" },
  { id: "karir", label: "Quarter-life Crisis & Karir", emoji: "💼" },
  { id: "burnout", label: "Burnout & Cemas Berlebihan", emoji: "🌪️" },
  { id: "kesepian", label: "Rasa Kesepian & Validasi Diri", emoji: "🌧️" },
];

export default function PeerSupportPage() {
  const user = useAppStore((s) => s.user);
  const activeSession = useAppStore((s) => s.activeSession);
  const startPeerSession = useAppStore((s) => s.startPeerSession);
  const sendPeerMessage = useAppStore((s) => s.sendPeerMessage);
  const extendSession = useAppStore((s) => s.extendSession);
  const endPeerSession = useAppStore((s) => s.endPeerSession);
  const reportPeerSession = useAppStore((s) => s.reportPeerSession);
  const triggerEmergencyModal = useAppStore((s) => s.triggerEmergencyModal);

  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0].label);
  const [isMatching, setIsMatching] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [guidelinesAgreed, setGuidelinesAgreed] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60); // 30 minutes in seconds
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeSession) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          endPeerSession("Waktu sesi habis");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession, endPeerSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  const handleStartMatching = () => {
    setShowGuidelinesModal(true);
  };

  const handleConfirmGuidelines = () => {
    setShowGuidelinesModal(false);
    setIsMatching(true);

    setTimeout(() => {
      setIsMatching(false);
      startPeerSession(selectedTopic);
      setTimeLeft(30 * 60);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeSession) return;

    // Scan for crisis keywords in chat
    const check = checkCrisisPatterns(inputMessage);
    if (check.severity !== "none") {
      triggerEmergencyModal(check.severity);
    }

    sendPeerMessage(inputMessage.trim());
    setInputMessage("");
  };

  const handleReport = () => {
    if (!reportReason.trim()) return;
    reportPeerSession(reportReason);
    setReportModalOpen(false);
    setReportReason("");
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-semibold text-teal-700 mb-2">
          <PeerIcon className="w-3.5 h-3.5" />
          <span>Ruang Aman Terstruktur</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Peer Support 1-on-1
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Berbagi cerita dengan sesama teman bicara yang memahami situasimu. Setiap sesi memiliki panduan etika dan batas waktu agar tetap sehat bagi kedua pihak.
        </p>
      </div>

      {!activeSession && !isMatching ? (
        /* Topic Selection & Intro Screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-display text-lg text-ink-900 mb-1">
                Pilih Topik yang Ingin Kamu Ceritakan
              </h2>
              <p className="text-xs text-ink-500">
                Kami akan memasangkanmu dengan teman bicara yang memilih topik serupa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.label;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.label)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-teal-50/70 border-teal-600 ring-2 ring-teal-600/20 font-semibold"
                        : "bg-mist-50 border-ink-200 hover:border-teal-300 hover:bg-white text-ink-800"
                    }`}
                  >
                    <span className="text-2xl">{topic.emoji}</span>
                    <span className="text-xs sm:text-sm">{topic.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-ink-200">
              <button
                onClick={handleStartMatching}
                className="w-full sm:w-auto rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-8 py-3.5 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Cari Teman Bicara</span>
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          {/* Safety & Guidelines Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-50/50 to-white rounded-3xl p-6 sm:p-8 border border-teal-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-teal-700 font-bold">
                Etika Ruang Aman
              </span>
              <h3 className="font-display text-lg text-ink-900 mt-1 mb-3">
                Mengapa Sesi Ini Terstruktur?
              </h3>
              <ul className="space-y-2.5 text-xs text-ink-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Identitas Anonim:</strong> Hanya nickname yang saling terlihat. Dilarang bertukar nomor telepon/sosmed pribadi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Dengar Tanpa Menghakimi:</strong> Ruang ini bukan untuk berdebat atau memberi nasihat medis tanpa diminta.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Batas Waktu Sehat (30 Menit):</strong> Mencegah trauma dumping berkepanjangan dan menjaga energi emosional kedua belah pihak.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Kontrol Keamanan Penuh:</strong> Tombol lapor dan akhiri sesi selalu tersedia seketika.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-teal-100 text-[11px] text-ink-600">
              🛡️ Semua percakapan otomatis dibersihkan setelah sesi berakhir demi privasimu.
            </div>
          </div>
        </div>
      ) : isMatching ? (
        /* Matching Screen Animation */
        <div className="bg-white rounded-3xl p-12 border border-ink-200 shadow-sm max-w-xl mx-auto text-center space-y-6">
          <div className="relative flex h-32 w-32 mx-auto items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full bg-teal-100 animate-ping opacity-60" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-teal-600 text-white text-3xl shadow-lg">
              👥
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink-900">Mencarikan Teman Bicara...</h2>
            <p className="text-xs text-ink-500 mt-2 max-w-md mx-auto">
              Menghubungkanmu dengan peer yang juga ingin mengobrol tentang topik <strong>&ldquo;{selectedTopic}&rdquo;</strong>.
            </p>
          </div>
        </div>
      ) : (
        /* Active Chat Room */
        <div className="bg-white rounded-3xl border border-ink-200 shadow-sm max-w-4xl mx-auto overflow-hidden flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="bg-mist-50 border-b border-ink-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                {activeSession?.peerNickname.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-ink-900">{activeSession?.peerNickname}</h3>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Aktif
                  </span>
                </div>
                <p className="text-[11px] text-ink-500">Topik: {activeSession?.topic}</p>
              </div>
            </div>

            {/* Timer & Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 bg-ink-900 text-white px-3 py-1.5 rounded-xl font-mono text-xs font-semibold shadow-xs">
                <span>⏱️</span>
                <span>{formatTimer(timeLeft)}</span>
              </div>

              <button
                onClick={() => extendSession(15)}
                className="text-xs bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-xl font-medium transition-colors"
                title="Tambah 15 menit"
              >
                +15 Menit
              </button>

              <button
                onClick={() => setReportModalOpen(true)}
                className="text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl font-medium transition-colors"
              >
                Laporkan
              </button>

              <button
                onClick={() => endPeerSession("Diakhiri pengguna")}
                className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl font-medium transition-colors shadow-xs"
              >
                Akhiri Sesi
              </button>
            </div>
          </div>

          {/* Chat Messages Timeline */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-mist-50/40">
            {activeSession?.messages.map((msg) => {
              const isMe = msg.senderId === user?.id || msg.senderNickname === "Kamu";
              const isSystem = msg.senderId === "system";

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="inline-block bg-teal-50 border border-teal-200 text-teal-800 text-[11px] px-3.5 py-1.5 rounded-full">
                      {msg.content}
                    </span>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] text-ink-400 mb-1 px-1">{msg.senderNickname}</span>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? "bg-teal-600 text-white rounded-br-xs shadow-xs"
                        : "bg-white text-ink-900 border border-ink-200 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Demo Crisis Tester Helper */}
          <div className="px-4 py-2 bg-teal-50/50 border-t border-teal-100 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="font-semibold text-teal-800 font-mono">🧪 Uji Chat Krisis:</span>
            <button
              type="button"
              onClick={() =>
                setInputMessage("Aku merasa tidak ada gunanya lagi dan ingin mengakhiri hidup.")
              }
              className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer"
            >
              ⚡ Isi Kalimat Berisiko
            </button>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-ink-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan dengan sopan & empati..."
              className="flex-1 rounded-full border border-ink-200 px-4 py-3 text-xs sm:text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="rounded-full bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white px-5 py-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Kirim
            </button>
          </form>
        </div>
      )}

      {/* Community Guidelines Modal */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-ink-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-4 border border-teal-200">
              <SparklesIcon className="w-6 h-6" />
            </div>

            <h3 className="font-display text-xl text-ink-900 mb-2">
              Panduan Komunitas Sebelum Mulai
            </h3>
            <p className="text-xs text-ink-600 leading-relaxed mb-4">
              Demi kenyamanan dan keamanan bersama, mohon setujui poin-poin berikut:
            </p>

            <div className="space-y-2.5 text-xs text-ink-800 bg-mist-50 p-4 rounded-2xl border border-ink-200 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">1.</span>
                <span><strong>Dengarkan tanpa menghakimi:</strong> Terima cerita temanmu tanpa meremehkan apa yang ia rasakan.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">2.</span>
                <span><strong>Bukan pengganti diagnosis:</strong> Jangan memberi resep atau saran medis tanpa kualifikasi profesional.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">3.</span>
                <span><strong>Jaga privasi:</strong> Jangan meminta atau memberikan nomor HP, alamat, atau media sosial pribadi.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="flex-1 rounded-full border border-ink-200 py-3 text-xs font-semibold text-ink-700 hover:bg-mist-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmGuidelines}
                className="flex-1 rounded-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Saya Mengerti & Setuju
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-ink-200">
            <h3 className="font-display text-xl text-ink-900 mb-2">Laporkan Percakapan</h3>
            <p className="text-xs text-ink-600 mb-4">
              Jelaskan alasan laporan. Sesi chat akan segera dihentikan dan ditinjau oleh sistem.
            </p>

            <textarea
              rows={4}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Contoh: Pengguna berkata kasar, meminta kontak pribadi, atau membuat tidak nyaman..."
              className="w-full rounded-2xl border border-ink-200 p-3 text-xs text-ink-900 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-ink-700 hover:bg-mist-100 rounded-full"
              >
                Batal
              </button>
              <button
                onClick={handleReport}
                disabled={!reportReason.trim()}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold"
              >
                Kirim Laporan & Akhiri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
