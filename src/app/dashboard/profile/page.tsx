"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { UserIcon, ShieldAlertIcon, SparklesIcon } from "@/components/common/Icons";
import { MilestoneBadges } from "@/components/gamification/MilestoneBadges";

const AVATAR_OPTIONS = [
  { id: "avatar-1", emoji: "🌿", label: "Daun Teduh" },
  { id: "avatar-2", emoji: "☁️", label: "Awan Tenang" },
  { id: "avatar-3", emoji: "🌊", label: "Ombak Damai" },
  { id: "avatar-4", emoji: "🌙", label: "Bulan Sabit" },
  { id: "avatar-5", emoji: "🌸", label: "Bunga Mekar" },
  { id: "avatar-6", emoji: "☕", label: "Kopi Hangat" },
];

export default function ProfilePage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const moodEntries = useAppStore((s) => s.moodEntries);
  const journalEntries = useAppStore((s) => s.journalEntries);
  const cbtRecords = useAppStore((s) => s.cbtRecords);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const deleteAccount = useAppStore((s) => s.deleteAccount);
  const logout = useAppStore((s) => s.logout);

  const [nickname, setNickname] = useState(user?.nickname || "");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarSeed || "avatar-1");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Delete account confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    updateProfile({
      nickname: nickname.trim(),
      avatarSeed: selectedAvatar,
    });

    setSaveMessage("Profil berhasil diperbarui.");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleExportData = () => {
    const exportPayload = {
      user: {
        nickname: user?.nickname,
        email: user?.email,
        createdAt: user?.createdAt,
        screeningResult: user?.screeningResult,
      },
      moodEntries,
      journalEntries,
      cbtRecords,
      exportedAt: new Date().toISOString(),
      platform: "Ruang - Platform Kesehatan Mental Gen Z",
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `data_ruang_${user?.nickname || "user"}_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationInput !== "HAPUS") return;
    deleteAccount();
    router.push("/");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-mist-200 px-3 py-1 text-xs font-semibold text-ink-700 mb-2">
          <UserIcon className="w-3.5 h-3.5" />
          <span>Pengaturan Akun & Privasi</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900">
          Profil & Kontrol Data Mandiri
        </h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl">
          Kamu memiliki kendali penuh atas identitas anonimmu, transparansi data, dan hak penghapusan permanen kapan saja.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm space-y-6">
          <h2 className="font-display text-lg text-ink-900">Identitas Anonim</h2>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2">
                Pilih Simbol Avatar
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((av) => {
                  const isSelected = selectedAvatar === av.id;
                  return (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-sage-50 border-sage-600 ring-2 ring-sage-600/20 scale-105"
                          : "bg-mist-50 border-ink-200 hover:border-sage-400 hover:bg-white"
                      }`}
                    >
                      <span className="text-2xl mb-1">{av.emoji}</span>
                      <span className="text-[10px] font-medium text-ink-700 text-center leading-tight">
                        {av.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nickname input */}
            <div>
              <label htmlFor="nickname" className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
                Nickname Anonim
              </label>
              <input
                id="nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full rounded-xl border border-ink-200 p-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
              <span className="text-[11px] text-ink-500 mt-1 block">
                Nama ini yang akan ditampilkan saat terhubung di sesi peer support.
              </span>
            </div>

            {/* Email (Readonly) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1">
                Email Terdaftar (Privat)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || "kamu@ruangtenang.id"}
                className="w-full rounded-xl border border-ink-200 bg-mist-100 p-3 text-sm text-ink-500 cursor-not-allowed"
              />
            </div>

            {saveMessage && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-emerald-600" />
                <span>{saveMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="rounded-full bg-sage-600 hover:bg-sage-700 text-white font-medium text-xs px-6 py-3 transition-colors cursor-pointer shadow-sm"
              >
                Simpan Perubahan
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold text-ink-500 hover:text-ink-900 underline cursor-pointer"
              >
                Keluar (Logout)
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Privacy Control & Export / Delete (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Data Export Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-200 shadow-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">
              Hak Akses Data
            </span>
            <h3 className="font-display text-lg text-ink-900">Unduh Salinan Data Kamu</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Kamu berhak memiliki salinan seluruh catatan mood, refleksi jurnal, dan riwayat aktivitasmu dalam format file JSON terstruktur.
            </p>
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-mist-100 hover:bg-emerald-50 hover:text-emerald-700 text-ink-800 text-xs font-semibold py-3 border border-ink-200 transition-colors cursor-pointer"
            >
              <span>📥 Ekspor Data Saya (.json)</span>
            </button>
          </div>

          {/* Delete Account Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-rose-700 font-bold">
              Hak untuk Dilupakan
            </span>
            <h3 className="font-display text-lg text-ink-900">Hapus Akun Permanen</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Menghapus akun akan membersihkan seluruh catatan mood, jurnal terenkripsi, dan riwayat obrolan secara permanen tanpa dapat dipulihkan kembali.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold py-3 border border-rose-200 transition-colors cursor-pointer"
            >
              Hapus Akun & Seluruh Data
            </button>
          </div>
        </div>
      </div>

      {/* Badges and Milestones Section */}
      <MilestoneBadges />

      {/* Delete Confirmation Modal (2-Step) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-ink-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl border border-rose-200 mx-auto">
              ⚠️
            </div>

            <div className="text-center">
              <h3 className="font-display text-xl text-ink-900">Konfirmasi Hapus Akun</h3>
              <p className="text-xs text-ink-600 mt-1">
                Tindakan ini permanen. Semua data jurnal dan mood-mu akan dihapus seketika.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1 text-center">
                Ketik kata <strong className="text-rose-600 font-mono">HAPUS</strong> untuk melanjutkan:
              </label>
              <input
                type="text"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                placeholder="HAPUS"
                className="w-full rounded-xl border border-ink-200 p-3 text-center text-sm font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationInput("");
                }}
                className="flex-1 rounded-full border border-ink-200 py-2.5 text-xs font-semibold text-ink-700 hover:bg-mist-100"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationInput !== "HAPUS"}
                className="flex-1 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white py-2.5 text-xs font-semibold transition-colors cursor-pointer"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
