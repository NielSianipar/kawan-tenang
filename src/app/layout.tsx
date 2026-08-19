import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruang — Teman Bicara untuk Gen Z",
  description:
    "Ruang aman untuk memahami mood-mu, menulis refleksi, dan terhubung dengan sesama — dengan jalur langsung ke bantuan profesional saat kamu butuh.",
};

import { GlobalCrisisHandler } from "@/components/emergency/GlobalCrisisHandler";
import { FloatingEmergencyButton } from "@/components/emergency/FloatingEmergencyButton";
import { AmbientSoundPlayer } from "@/components/audio/AmbientSoundPlayer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        {/* Font di-load langsung dari browser pengguna saat runtime,
            bukan saat build — supaya tidak bergantung pada akses
            jaringan di lingkungan development/CI. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-mist-100 text-ink-900 antialiased selection:bg-sage-100 selection:text-sage-700">
        {children}
        <AmbientSoundPlayer />
        <GlobalCrisisHandler />
        <FloatingEmergencyButton />
      </body>
    </html>
  );
}
