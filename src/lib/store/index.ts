"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatarSeed: string;
  createdAt: string;
  onboardingCompleted: boolean;
  screeningResult?: {
    score: number;
    category: "rendah" | "sedang" | "tinggi";
    completedAt: string;
    answers: number[];
  };
}

export interface MoodEntry {
  id: string;
  userId: string;
  moodScale: number; // 1 to 5
  note?: string;
  triggerTag?: string;
  entryDate: string; // YYYY-MM-DD
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  promptId?: string;
  promptText: string;
  content: string;
  flaggedCrisis: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PeerMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  timestamp: string;
}

export interface PeerSession {
  id: string;
  userId: string;
  topic: string;
  peerNickname: string;
  peerAvatar: string;
  status: "waiting" | "active" | "ended" | "reported";
  startedAt: string;
  durationMinutes: number;
  messages: PeerMessage[];
}

export interface CBTRecord {
  id: string;
  type: "breathing" | "grounding" | "reframing";
  completedAt: string;
  notes?: string;
  data?: any;
}

interface AppState {
  // Auth & Profile
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  deleteAccount: () => void;

  // Screening
  saveScreeningResult: (score: number, category: "rendah" | "sedang" | "tinggi", answers: number[]) => void;

  // Mood Tracker
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, "id" | "userId" | "createdAt">) => void;
  deleteMoodEntry: (id: string) => void;

  // Journaling
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "userId" | "createdAt">) => void;
  updateJournalEntry: (id: string, content: string) => void;
  deleteJournalEntry: (id: string) => void;

  // Peer Support Sessions
  activeSession: PeerSession | null;
  sessionHistory: PeerSession[];
  startPeerSession: (topic: string) => void;
  sendPeerMessage: (content: string) => void;
  extendSession: (extraMinutes: number) => void;
  endPeerSession: (reason?: string) => void;
  reportPeerSession: (reason: string) => void;

  // Micro-CBT Records
  cbtRecords: CBTRecord[];
  addCBTRecord: (record: Omit<CBTRecord, "id" | "completedAt">) => void;

  // Emergency Global Trigger
  isEmergencyModalOpen: boolean;
  emergencySeverity: "watch" | "high";
  triggerEmergencyModal: (severity?: "watch" | "high") => void;
  closeEmergencyModal: () => void;
}

// Initial rich mock data for competition demo
const initialDemoMoods: MoodEntry[] = [
  {
    id: "m-1",
    userId: "demo-user",
    moodScale: 2,
    note: "Banyak tugas kuliah numpuk dan deadline mepet.",
    triggerTag: "Akademik",
    entryDate: new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: "m-2",
    userId: "demo-user",
    moodScale: 3,
    note: "Mulai nyicil tugas, lumayan lega sedikit.",
    triggerTag: "Akademik",
    entryDate: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "m-3",
    userId: "demo-user",
    moodScale: 2,
    note: "Perselisihan kecil sama teman satu kelompok.",
    triggerTag: "Pertemanan",
    entryDate: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "m-4",
    userId: "demo-user",
    moodScale: 4,
    note: "Jalan sore dan dengar musik, kepala jauh lebih enteng.",
    triggerTag: "Kesehatan",
    entryDate: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "m-5",
    userId: "demo-user",
    moodScale: 3,
    note: "Hari biasa, tidak terlalu buruk.",
    triggerTag: "Keluarga",
    entryDate: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "m-6",
    userId: "demo-user",
    moodScale: 4,
    note: "Istirahat cukup dan makan makanan favorit.",
    triggerTag: "Kesehatan",
    entryDate: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const initialDemoJournals: JournalEntry[] = [
  {
    id: "j-1",
    userId: "demo-user",
    promptId: "gratitude-1",
    promptText: "Apa satu hal kecil yang membuatmu tersenyum atau merasa aman hari ini?",
    content:
      "Tadi sore sempat beli kopi favorit sambil duduk diam tanpa buka sosmed selama 15 menit. Rasanya tenang banget dan nggak ada tuntutan apa-apa.",
    flaggedCrisis: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "j-2",
    userId: "demo-user",
    promptId: "release-1",
    promptText: "Keluarkan apa yang terasa paling mengganjal di pikiranmu saat ini tanpa menghakimi diri sendiri.",
    content:
      "Kadang aku merasa tertinggal dibanding teman-teman yang sudah magang di perusahaan besar. Aku tahu ini fase masing-masing, tapi rasa cemasnya tetap muncul.",
    flaggedCrisis: false,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
];

const defaultUser: UserProfile = {
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
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      setUser: (user) => set({ user }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      logout: () => set({ user: null }),
      deleteAccount: () =>
        set({
          user: null,
          moodEntries: [],
          journalEntries: [],
          sessionHistory: [],
          activeSession: null,
          cbtRecords: [],
        }),

      saveScreeningResult: (score, category, answers) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                onboardingCompleted: true,
                screeningResult: {
                  score,
                  category,
                  completedAt: new Date().toISOString(),
                  answers,
                },
              }
            : null,
        })),

      moodEntries: initialDemoMoods,
      addMoodEntry: (entry) =>
        set((state) => {
          const newEntry: MoodEntry = {
            ...entry,
            id: `m-${Date.now()}`,
            userId: state.user?.id || "anonymous",
            createdAt: new Date().toISOString(),
          };
          // Replace if entry for same date exists
          const filtered = state.moodEntries.filter((m) => m.entryDate !== entry.entryDate);
          return { moodEntries: [newEntry, ...filtered] };
        }),
      deleteMoodEntry: (id) =>
        set((state) => ({
          moodEntries: state.moodEntries.filter((m) => m.id !== id),
        })),

      journalEntries: initialDemoJournals,
      addJournalEntry: (entry) =>
        set((state) => {
          const newEntry: JournalEntry = {
            ...entry,
            id: `j-${Date.now()}`,
            userId: state.user?.id || "anonymous",
            createdAt: new Date().toISOString(),
          };
          return { journalEntries: [newEntry, ...state.journalEntries] };
        }),
      updateJournalEntry: (id, content) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((j) =>
            j.id === id ? { ...j, content, updatedAt: new Date().toISOString() } : j
          ),
        })),
      deleteJournalEntry: (id) =>
        set((state) => ({
          journalEntries: state.journalEntries.filter((j) => j.id !== id),
        })),

      activeSession: null,
      sessionHistory: [],
      startPeerSession: (topic) => {
        const peerNames = ["TemanBicara_42", "NapasHangat", "Sahabat_Awan", "DengarTanpaHakim", "BintangMalam"];
        const randomPeer = peerNames[Math.floor(Math.random() * peerNames.length)];
        const session: PeerSession = {
          id: `session-${Date.now()}`,
          userId: get().user?.id || "demo-user",
          topic,
          peerNickname: randomPeer,
          peerAvatar: `peer-${Math.floor(Math.random() * 5) + 1}`,
          status: "active",
          startedAt: new Date().toISOString(),
          durationMinutes: 30,
          messages: [
            {
              id: `msg-welcome`,
              sessionId: `session-${Date.now()}`,
              senderId: "system",
              senderNickname: "Sistem Ruang",
              content:
                "Sesi peer support dimulai. Ingat untuk saling mendengarkan tanpa menghakimi dan menjaga ruang ini tetap aman.",
              timestamp: new Date().toISOString(),
            },
            {
              id: `msg-peer-hello`,
              sessionId: `session-${Date.now()}`,
              senderId: "peer",
              senderNickname: randomPeer,
              content: `Halo! Salam kenal. Aku juga lagi ngerasa relate banget sama topik ${topic}. Mau mulai cerita dari mana?`,
              timestamp: new Date().toISOString(),
            },
          ],
        };
        set({ activeSession: session });
      },
      sendPeerMessage: (content) => {
        const current = get().activeSession;
        if (!current) return;
        const newMsg: PeerMessage = {
          id: `msg-${Date.now()}`,
          sessionId: current.id,
          senderId: get().user?.id || "demo-user",
          senderNickname: get().user?.nickname || "Kamu",
          content,
          timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...current.messages, newMsg];
        set({
          activeSession: {
            ...current,
            messages: updatedMessages,
          },
        });

        // Simulate intelligent empathetic peer reply after a brief moment
        setTimeout(() => {
          const peerReplies = [
            "Terima kasih sudah mau cerita hal ini. Aku bisa ngerasain betapa beratnya di posisimu sekarang.",
            "Wajar banget kalau kamu ngerasa begitu. Jangan terlalu keras sama dirimu sendiri ya.",
            "Iya, aku paham rasanya. Kadang ekspektasi lingkungan bikin kita lupa kalau kita juga manusia biasa.",
            "Semangat ya, kamu hebat udah bisa bertahan dan merefleksikan ini hari ini.",
          ];
          const replyText = peerReplies[Math.floor(Math.random() * peerReplies.length)];
          const peerMsg: PeerMessage = {
            id: `msg-${Date.now() + 1}`,
            sessionId: current.id,
            senderId: "peer",
            senderNickname: current.peerNickname,
            content: replyText,
            timestamp: new Date().toISOString(),
          };
          set((state) => {
            if (!state.activeSession) return state;
            return {
              activeSession: {
                ...state.activeSession,
                messages: [...state.activeSession.messages, peerMsg],
              },
            };
          });
        }, 2200);
      },
      extendSession: (extraMinutes) =>
        set((state) => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              durationMinutes: state.activeSession.durationMinutes + extraMinutes,
            },
          };
        }),
      endPeerSession: (reason) =>
        set((state) => {
          if (!state.activeSession) return state;
          const ended: PeerSession = {
            ...state.activeSession,
            status: "ended",
          };
          return {
            activeSession: null,
            sessionHistory: [ended, ...state.sessionHistory],
          };
        }),
      reportPeerSession: (reason) =>
        set((state) => {
          if (!state.activeSession) return state;
          const reported: PeerSession = {
            ...state.activeSession,
            status: "reported",
          };
          return {
            activeSession: null,
            sessionHistory: [reported, ...state.sessionHistory],
          };
        }),

      cbtRecords: [
        {
          id: "cbt-1",
          type: "breathing",
          completedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
          notes: "Box breathing 4 siklus sebelum tidur.",
        },
      ],
      addCBTRecord: (record) =>
        set((state) => ({
          cbtRecords: [
            {
              ...record,
              id: `cbt-${Date.now()}`,
              completedAt: new Date().toISOString(),
            },
            ...state.cbtRecords,
          ],
        })),

      isEmergencyModalOpen: false,
      emergencySeverity: "watch",
      triggerEmergencyModal: (severity = "high") =>
        set({ isEmergencyModalOpen: true, emergencySeverity: severity }),
      closeEmergencyModal: () => set({ isEmergencyModalOpen: false }),
    }),
    {
      name: "ruang_app_storage_v1",
    }
  )
);
