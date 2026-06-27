import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  mentor_id: string;
  mentor_name: string;
  slot_date: string;
  slot_time: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  student_name: string;
  student_grade: number;
  subject: string;
  booking_type: string;
  status: BookingStatus;
  meeting_link: string;
  notes: string | null;
  created_at: string;
};

export type BookingInsert = Omit<Booking, "id" | "created_at">;

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!adminClient) {
    adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }

  return adminClient;
}

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key);
}
