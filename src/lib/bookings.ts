import type { Booking, BookingInsert } from "./supabase";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const memoryBookings: Booking[] = [];

export async function getBookedSlotKeys(): Promise<Set<string>> {
  const keys = new Set<string>();

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;
    const { data } = await supabase
      .from("bookings")
      .select("slot_date, slot_time")
      .neq("status", "cancelled");

    data?.forEach((b) => keys.add(`${b.slot_date}_${b.slot_time}`));
  } else {
    memoryBookings
      .filter((b) => b.status !== "cancelled")
      .forEach((b) => keys.add(`${b.slot_date}_${b.slot_time}`));
  }

  return keys;
}

export async function updateMeetingLink(
  id: string,
  meetingLink: string
): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;
    await supabase.from("bookings").update({ meeting_link: meetingLink }).eq("id", id);
    return;
  }

  const idx = memoryBookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    memoryBookings[idx] = { ...memoryBookings[idx], meeting_link: meetingLink };
  }
}

export async function createBooking(
  booking: BookingInsert
): Promise<{ booking: Booking; storage: "supabase" | "memory" }> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;

    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("slot_date", booking.slot_date)
      .eq("slot_time", booking.slot_time)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      throw new Error("This slot was just booked. Please pick another time.");
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert(booking)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { booking: data as Booking, storage: "supabase" };
  }

  const conflict = memoryBookings.find(
    (b) =>
      b.slot_date === booking.slot_date &&
      b.slot_time === booking.slot_time &&
      b.status !== "cancelled"
  );

  if (conflict) {
    throw new Error("This slot was just booked. Please pick another time.");
  }

  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  memoryBookings.unshift(newBooking);
  return { booking: newBooking, storage: "memory" };
}

export async function listBookings(): Promise<Booking[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as Booking[]) ?? [];
  }

  return [...memoryBookings];
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Booking;
  }

  const idx = memoryBookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  memoryBookings[idx] = { ...memoryBookings[idx], status };
  return memoryBookings[idx];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()!;
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    return (data as Booking) ?? null;
  }

  return memoryBookings.find((b) => b.id === id) ?? null;
}
