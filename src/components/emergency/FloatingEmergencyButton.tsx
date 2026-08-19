"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { PhoneCallIcon, ShieldAlertIcon } from "@/components/common/Icons";

export function FloatingEmergencyButton() {
  const triggerEmergencyModal = useAppStore((s) => s.triggerEmergencyModal);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip hint on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-ink-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none mb-1 whitespace-nowrap">
        Butuh bantuan darurat / krisis sekarang?
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/emergency"
          className="hidden sm:flex items-center gap-2 bg-white/90 hover:bg-white text-rose-700 border border-rose-200 shadow-md backdrop-blur-md px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all hover:shadow-lg hover:scale-105"
        >
          <PhoneCallIcon className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>Hotline Sejiwa (119 ext 8)</span>
        </Link>

        <button
          id="btn-emergency-global"
          onClick={() => triggerEmergencyModal("high")}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-rose-600/30 transition-all transform hover:scale-105 active:scale-95 focus:ring-4 focus:ring-rose-200"
          title="Bantuan Darurat Krisis"
        >
          <ShieldAlertIcon className="w-5 h-5 animate-bounce" />
          <span className="text-sm font-medium">Bantuan Darurat</span>
        </button>
      </div>
    </div>
  );
}
