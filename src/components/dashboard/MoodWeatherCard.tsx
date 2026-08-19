"use client";

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";

const WEATHER_META: {
  [scale: number]: {
    weather: string;
    icon: string;
    description: string;
    bgGradient: string;
    accentColor: string;
  };
} = {
  1: {
    weather: "Badai Emosional",
    icon: "⛈️",
    description: "Langit hatimu sedang berangin kencang. Istirahatlah dan jangan sungkan meminta bantuan orang lain.",
    bgGradient: "from-rose-50 to-orange-50 border-rose-200",
    accentColor: "text-rose-700",
  },
  2: {
    weather: "Hujan Rintik",
    icon: "🌧️",
    description: "Hari yang agak mendung dan menguras energi. Tidak apa-apa untuk melambat sejenak hari ini.",
    bgGradient: "from-blue-50 to-indigo-50 border-blue-200",
    accentColor: "text-blue-700",
  },
  3: {
    weather: "Berawan Teduh",
    icon: "⛅",
    description: "Kondisi emosi yang stabil dan netral. Nikmati ketenangan sederhana hari ini.",
    bgGradient: "from-amber-50/50 to-yellow-50/30 border-amber-200",
    accentColor: "text-amber-700",
  },
  4: {
    weather: "Cerah Berangin",
    icon: "🌤️",
    description: "Ada banyak kesegaran dan rasa lega yang menyelimuti harimu. Pertahankan energi positif ini.",
    bgGradient: "from-emerald-50 to-teal-50 border-emerald-200",
    accentColor: "text-emerald-700",
  },
  5: {
    weather: "Cerah Bersinar",
    icon: "☀️",
    description: "Hatimu penuh dengan rasa syukur dan kehangatan. Sebarkan energi baik ini ke sekitarmu!",
    bgGradient: "from-yellow-50 to-amber-50 border-yellow-200",
    accentColor: "text-amber-600",
  },
};

export function MoodWeatherCard() {
  const moodEntries = useAppStore((s) => s.moodEntries);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayMood = moodEntries.find((m) => m.entryDate === todayStr);

  const currentWeather = useMemo(() => {
    const scale = todayMood?.moodScale || 3;
    return WEATHER_META[scale] || WEATHER_META[3];
  }, [todayMood]);

  return (
    <div
      className={`rounded-3xl p-6 border shadow-sm bg-gradient-to-br transition-all ${currentWeather.bgGradient}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink-500">
            Metafora Cuaca Hati
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl">{currentWeather.icon}</span>
            <div>
              <h3 className={`font-display text-lg font-bold ${currentWeather.accentColor}`}>
                {currentWeather.weather}
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed max-w-sm mt-0.5">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-[10px] font-mono text-ink-500 uppercase">Skala Hari Ini</span>
          <span className="text-2xl font-bold font-mono text-ink-900">
            {todayMood ? `${todayMood.moodScale}/5` : "3/5 (Netral)"}
          </span>
        </div>
      </div>
    </div>
  );
}
