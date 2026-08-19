"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const existingUser = useAppStore((s) => s.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate auth check / quick login
      if (!email.includes("@") || password.length < 6) {
        throw new Error("Email tidak valid atau kata sandi minimal 6 karakter.");
      }

      // Check if user already has profile in store or create demo profile
      const loggedUser = existingUser || {
        id: `user-${Date.now()}`,
        email: email,
        nickname: email.split("@")[0],
        avatarSeed: "avatar-1",
        createdAt: new Date().toISOString(),
        onboardingCompleted: true,
      };

      setUser(loggedUser);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Silakan periksa kembali data kamu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUser({
      id: "demo-user",
      email: "kamu@ruangtenang.id",
      nickname: "KawanTenang",
      avatarSeed: "avatar-1",
      createdAt: new Date().toISOString(),
      onboardingCompleted: true,
      screeningResult: {
        score: 8,
        category: "sedang",
        completedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        answers: [1, 1, 2, 1, 1, 0, 1, 1],
      },
    });
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-mist-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link href="/" className="inline-block">
          <span className="font-display text-3xl tracking-tight text-ink-900">Ruang</span>
        </Link>
        <h2 className="mt-4 font-display text-2xl tracking-tight text-ink-900">
          Selamat datang kembali
        </h2>
        <p className="mt-2 text-sm text-ink-500">
          Ruang amanmu untuk merenung dan bercerita.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-ink-900/5 sm:rounded-3xl sm:px-10 border border-ink-200">
          {error && (
            <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                Email
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Kata Sandi
                </label>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-full bg-sage-600 py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600/50 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? "Memproses..." : "Masuk ke Ruang"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-ink-500">atau untuk uji coba demo</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              type="button"
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-full border border-honey-400 bg-honey-50/50 py-3 px-4 text-xs font-semibold text-honey-600 hover:bg-honey-50 transition-colors"
            >
              <span>⚡ Masuk Cepat sebagai Akun Demo</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-ink-500">
            Belum punya akun?{" "}
            <Link href="/signup" className="font-semibold text-sage-600 hover:text-sage-700 underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
