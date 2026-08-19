/**
 * Tipe dasar untuk tabel Supabase (lihat supabase/schema.sql).
 *
 * Untuk versi lengkap & selalu sinkron dengan schema asli, generate
 * otomatis setelah project Supabase dibuat:
 *
 *   npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string;
          avatar_seed: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          nickname: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_scale: number;
          note: string | null;
          trigger_tag: string | null;
          entry_date: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["mood_entries"]["Row"]> & {
          user_id: string;
          mood_scale: number;
        };
        Update: Partial<Database["public"]["Tables"]["mood_entries"]["Row"]>;
        Relationships: [];
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          prompt_id: string | null;
          content_encrypted: string;
          flagged_crisis: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["journal_entries"]["Row"]> & {
          user_id: string;
          content_encrypted: string;
        };
        Update: Partial<Database["public"]["Tables"]["journal_entries"]["Row"]>;
        Relationships: [];
      };
      peer_sessions: {
        Row: {
          id: string;
          user_id_1: string;
          user_id_2: string | null;
          topic: string;
          status: "waiting" | "active" | "ended" | "reported";
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["peer_sessions"]["Row"]> & {
          user_id_1: string;
          topic: string;
        };
        Update: Partial<Database["public"]["Tables"]["peer_sessions"]["Row"]>;
        Relationships: [];
      };
      crisis_logs: {
        Row: {
          id: string;
          user_id: string;
          source: "journal" | "peer_chat" | "unknown";
          severity: "watch" | "high";
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["crisis_logs"]["Row"]> & {
          user_id: string;
          source: "journal" | "peer_chat" | "unknown";
          severity: "watch" | "high";
        };
        Update: Partial<Database["public"]["Tables"]["crisis_logs"]["Row"]>;
        Relationships: [];
      };
      professional_directory: {
        Row: {
          id: string;
          name: string;
          specialization: string | null;
          city: string | null;
          mode: "online" | "offline" | "both" | null;
          price_range: string | null;
          contact_info: string | null;
          is_demo_data: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["professional_directory"]["Row"]> & {
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["professional_directory"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
