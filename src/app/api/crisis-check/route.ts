import { NextResponse } from "next/server";
import { checkCrisisPatterns } from "@/lib/crisis-detection/keywords";
import { createClient } from "@/lib/supabase/server";

/**
 * Route ini dipanggil SEBELUM entri jurnal / pesan chat disimpan.
 * Selalu jalan di server supaya daftar pola tidak pernah terekspos ke client,
 * dan supaya CrisisLog tercatat terlepas dari apa yang dilakukan frontend.
 */
export async function POST(request: Request) {
  const { text, source } = await request.json();

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Teks tidak valid" }, { status: 400 });
  }

  const result = checkCrisisPatterns(text);

  if (result.severity !== "none") {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Catat ke CrisisLog untuk audit keamanan — TIDAK menyimpan isi teks aslinya,
      // hanya metadata, supaya tetap minim data.
      await supabase.from("crisis_logs").insert({
        user_id: user.id,
        source: source ?? "unknown",
        severity: result.severity,
      });
    }
  }

  return NextResponse.json(result);
}
