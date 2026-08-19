"use client";

import { useState, useEffect, useRef } from "react";
import { SparklesIcon } from "@/components/common/Icons";

type SoundType = "rain" | "ocean" | "wind" | "whitenoise";

export function AmbientSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<SoundType>("rain");
  const [volume, setVolume] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Stop current audio generator
  const stopAudio = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as any).stop?.();
        noiseNodeRef.current.disconnect();
      } catch (e) {
        // ignore disconnect errors
      }
      noiseNodeRef.current = null;
    }
  };

  // Start sound using Web Audio API procedural synthesis
  const startAudio = (type: SoundType) => {
    stopAudio();

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate procedural noise according to sound type
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === "rain") {
        // Pinkish brown noise with soft high frequency filter
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      } else if (type === "ocean") {
        // Modulated brown noise
        lastOut = (lastOut + 0.015 * white) / 1.015;
        data[i] = lastOut * 4.0;
      } else if (type === "wind") {
        // Low frequency resonant wind noise
        lastOut = (lastOut + 0.008 * white) / 1.008;
        data[i] = lastOut * 2.5;
      } else {
        // Standard gentle white/pink noise
        lastOut = (lastOut + 0.05 * white) / 1.05;
        data[i] = lastOut * 1.5;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter node to shape the acoustic tone
    const filter = ctx.createBiquadFilter();
    if (type === "rain") {
      filter.type = "lowpass";
      filter.frequency.value = 1200;
    } else if (type === "ocean") {
      filter.type = "bandpass";
      filter.frequency.value = 600;
      filter.Q.value = 1.0;
    } else if (type === "wind") {
      filter.type = "lowpass";
      filter.frequency.value = 450;
    } else {
      filter.type = "lowpass";
      filter.frequency.value = 3000;
    }

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
    gainNodeRef.current = gainNode;

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(0);
    noiseNodeRef.current = noise;
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      startAudio(currentSound);
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [isPlaying, currentSound]);

  const SOUND_OPTIONS: { id: SoundType; label: string; icon: string }[] = [
    { id: "rain", label: "Rintik Hujan", icon: "🌧️" },
    { id: "ocean", label: "Deburan Ombak", icon: "🌊" },
    { id: "wind", label: "Desir Angin", icon: "🍃" },
    { id: "whitenoise", label: "White Noise", icon: "☕" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Sound Settings Popup Drawer */}
      {isOpen && (
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-ink-200 w-64 space-y-4 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-sage-700 flex items-center gap-1.5">
              <span>🎧</span>
              <span>Mode Suara Tenang</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-ink-400 hover:text-ink-900 p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Sound selector */}
          <div className="grid grid-cols-2 gap-2">
            {SOUND_OPTIONS.map((opt) => {
              const isSelected = currentSound === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setCurrentSound(opt.id);
                    if (!isPlaying) setIsPlaying(true);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-xs transition-all cursor-pointer ${
                    isSelected && isPlaying
                      ? "bg-sage-600 border-sage-600 text-white font-semibold shadow-xs"
                      : "bg-mist-50 border-ink-200 hover:bg-white text-ink-800"
                  }`}
                >
                  <span className="text-xl mb-0.5">{opt.icon}</span>
                  <span className="text-[10px] text-center">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between text-[10px] font-semibold text-ink-600 mb-1">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-sage-600 cursor-pointer h-1.5 bg-mist-200 rounded-lg"
            />
          </div>

          {/* Play / Stop toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              isPlaying
                ? "bg-ink-900 hover:bg-ink-800 text-white"
                : "bg-sage-600 hover:bg-sage-700 text-white"
            }`}
          >
            <span>{isPlaying ? "⏸️ Hentikan Suara" : "▶️ Putar Suara Tenang"}</span>
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg border transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying
            ? "bg-sage-600 border-sage-500 text-white animate-pulse"
            : "bg-white/95 backdrop-blur-md border-ink-200 text-ink-800 hover:bg-white hover:border-sage-400"
        }`}
        title="Mode Suara Tenang (Ambient Audio)"
      >
        <span className="text-base">{isPlaying ? "🎵" : "🎧"}</span>
        <span className="text-xs font-semibold hidden sm:inline">
          {isPlaying ? "Suara Tenang Aktif" : "Mode Suara Tenang"}
        </span>
      </button>
    </div>
  );
}
