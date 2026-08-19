"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Email tidak valid.");
      return;
    }
    if (nickname.trim().length < 3) {
      setError("Nickname anonim minimal 3 karakter.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        nickname: nickname.trim(),
        avatarSeed: `avatar-${Math.floor(Math.random() * 6) + 1}`,
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      };

      setUser(newUser);
      // Direct newly signed up user to the onboarding screening process
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mist-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link href="/" className="inline-block">
          <span className="font-display text-3xl tracking-tight text-ink-900">Ruang</span>
        </Link>
        <h2 className="mt-4 font-display text-2xl tracking-tight text-ink-900">
          Buat Ruang Amanmu
        </h2>
        <p className="mt-2 text-sm text-ink-500">
          Email untuk keamanan, Nickname anonim untuk interaksi sesama kawan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-ink-900/5 sm:rounded-3xl sm:px-10 border border-ink-200">
          {error && (
            <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                Email Pribadi
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="mt-1 block w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
              <span className="text-[11px] text-ink-500 mt-1 block">Email tidak akan pernah dibagikan ke pengguna lain.</span>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                Nickname Anonim
              </label>
              <input
                id="nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="mis. BintangSenja, Sahabat_01"
                className="mt-1 block w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
              <span className="text-[11px] text-ink-500 mt-1 block">Nama yang akan tampil saat mengobrol di peer support.</span>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="mt-1 block w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-sage-600 py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600/50 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? "Menyiapkan Akun..." : "Lanjut ke Skrining Awal →"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-ink-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-sage-600 hover:text-sage-700 underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
