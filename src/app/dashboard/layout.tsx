import React from "react";
import { DashboardNavbar } from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist-100 flex flex-col selection:bg-sage-100 selection:text-sage-700">
      <DashboardNavbar />
      <main className="flex-1 pb-20">{children}</main>
      <footer className="border-t border-ink-200 bg-white/50 py-6 text-center text-xs text-ink-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Ruang — Platform Dukungan Kesehatan Mental Gen Z</span>
          <span className="text-[11px]">Bukan layanan gawat darurat klinis. Hotline 119 ext. 8 selalu tersedia.</span>
        </div>
      </footer>
    </div>
  );
}
