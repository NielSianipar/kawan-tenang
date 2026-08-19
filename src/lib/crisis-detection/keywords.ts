/**
 * Daftar pola risiko untuk deteksi krisis tahap awal (MVP).
 *
 * PENTING:
 * - Ini adalah lapisan pertama (keyword matching), bukan solusi akhir.
 * - Untuk versi lanjutan, gabungkan dengan klasifikasi berbasis AI
 *   (lihat src/lib/crisis-detection/ai-classifier.ts) supaya konteks
 *   kalimat dipahami, bukan hanya kecocokan kata literal.
 * - Daftar ini sebaiknya direview bersama pihak yang paham kesehatan
 *   mental sebelum dipakai di lingkungan produksi sungguhan.
 * - Simpan sesingkat mungkin di sini; jangan taruh daftar ini di kode
 *   frontend/client — proses deteksi harus berjalan di server.
 */

export type CrisisSeverity = "none" | "watch" | "high";

interface CrisisPattern {
  pattern: RegExp;
  severity: CrisisSeverity;
}

// Contoh pola tingkat tinggi (butuh eskalasi segera).
// Daftar ini CONTOH STRUKTUR — lengkapi dengan referensi dari sumber
// kesehatan mental resmi (mis. panduan WHO / Kemenkes) sebelum dipakai nyata.
const HIGH_RISK_PATTERNS: CrisisPattern[] = [
  { pattern: /ingin(\s+aja)?\s+(mati|mengakhiri hidup|bunuh diri)/i, severity: "high" },
  { pattern: /nggak\s+(pengen|mau)\s+hidup\s+lagi/i, severity: "high" },
  { pattern: /menyakiti\s+diri/i, severity: "high" },
];

// Pola tingkat "watch" — belum tentu darurat, tapi layak ditawari bantuan.
const WATCH_PATTERNS: CrisisPattern[] = [
  { pattern: /capek\s+banget\s+sama\s+hidup/i, severity: "watch" },
  { pattern: /nggak\s+ada\s+gunanya\s+lagi/i, severity: "watch" },
  { pattern: /sendirian\s+banget/i, severity: "watch" },
];

const ALL_PATTERNS = [...HIGH_RISK_PATTERNS, ...WATCH_PATTERNS];

export interface CrisisCheckResult {
  severity: CrisisSeverity;
  matchedPatternCount: number;
}

/**
 * Cek teks terhadap pola risiko. Fungsi ini murni (tidak menyimpan apa pun) —
 * pemanggilnya (route handler / server action) yang bertanggung jawab untuk
 * mencatat CrisisLog dan memicu respons UI.
 */
export function checkCrisisPatterns(text: string): CrisisCheckResult {
  let severity: CrisisSeverity = "none";
  let matchedPatternCount = 0;

  for (const { pattern, severity: patternSeverity } of ALL_PATTERNS) {
    if (pattern.test(text)) {
      matchedPatternCount += 1;
      if (patternSeverity === "high") {
        severity = "high";
      } else if (patternSeverity === "watch" && severity !== "high") {
        severity = "watch";
      }
    }
  }

  return { severity, matchedPatternCount };
}
