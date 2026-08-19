import Link from "next/link";

const PILLARS = [
  {
    label: "Kenali",
    title: "Lacak mood & tulis refleksi",
    desc: "Isi mood harian dan jurnal terpandu, lalu lihat polanya minggu demi minggu — bukan cuma ditumpuk, tapi dipahami.",
  },
  {
    label: "Terhubung",
    title: "Ngobrol dengan sesama, terstruktur",
    desc: "Dipasangkan dengan satu teman bicara, sesi ada batas waktu dan panduan jelas — bukan forum bebas tanpa arah.",
  },
  {
    label: "Aman",
    title: "Jalur bantuan selalu ada",
    desc: "Kalau kamu menunjukkan tanda butuh bantuan lebih, kami langsung arahkan ke layanan profesional — bukan dibiarkan sendiri.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mist-100">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden px-6 pt-8 pb-24 md:pt-12">
        <nav className="mx-auto flex max-w-5xl items-center justify-between pb-16">
          <span className="font-display text-lg tracking-tight text-ink-900">Ruang</span>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/emergency" className="text-ink-500 hover:text-sage-700">
              Butuh bantuan sekarang?
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-ink-200 px-4 py-2 text-ink-700 hover:bg-white transition-colors"
            >
              Masuk
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sage-600">
              Untuk kamu yang lagi capek
            </p>
            <h1 className="font-display text-4xl leading-[1.1] text-ink-900 md:text-5xl">
              Hidupmu nggak lagi kamu tanggung{" "}
              <span className="text-sage-600">sendirian.</span>
            </h1>
            <p className="mt-6 max-w-md text-ink-700 leading-relaxed">
              Ruang tempat kamu mengenali apa yang kamu rasakan, cerita ke seseorang yang
              mengerti, dan — kalau memang dibutuhkan — terhubung ke bantuan profesional.
              Semua dengan langkah yang jelas, bukan sekadar kolom curhat kosong.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-sage-600 px-7 py-3.5 font-medium text-white shadow-sm hover:bg-sage-700 transition-colors"
              >
                Mulai kenali dirimu
              </Link>
              <span className="text-sm text-ink-500">2 menit, tanpa perlu daftar panjang</span>
            </div>
          </div>

          {/* Signature element: lingkaran napas, merepresentasikan grounding exercise */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-sage-100/60 animate-breathe" />
              <div className="absolute h-44 w-44 rounded-full bg-sage-400/40 animate-breathe [animation-delay:0.6s]" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">
                <span className="font-display text-sm text-sage-700">tarik napas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TIGA PILAR ---------- */}
      <section className="border-t border-ink-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl text-ink-900 mb-2">Tiga hal yang kami jaga</h2>
          <p className="text-ink-500 mb-12 max-w-lg">
            Bukan platform curhat bebas. Setiap bagian dirancang supaya kamu merasa aman,
            bukan makin terbebani.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.label} className="rounded-2xl bg-mist-50 p-6">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-honey-600">
                  {p.label}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DISCLAIMER ---------- */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-sage-100 bg-sage-50 p-6 text-center">
          <p className="text-sm leading-relaxed text-ink-700">
            Ruang bukan layanan diagnosis atau pengganti konsultasi psikolog/psikiater.
            Kalau kamu dalam kondisi darurat, segera hubungi{" "}
            <a href="tel:119" className="font-medium text-sage-700 underline">
              layanan Sejiwa 119 ext. 8
            </a>{" "}
            atau lihat{" "}
            <Link href="/emergency" className="font-medium text-sage-700 underline">
              semua jalur bantuan
            </Link>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-ink-200 px-6 py-8 text-center text-xs text-ink-500">
        Dibuat untuk kompetisi web development — versi prototipe.
      </footer>
    </main>
  );
}
