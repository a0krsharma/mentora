import { NextRequest, NextResponse } from "next/server";
import { listBookings, updateBookingStatus } from "@/lib/bookings";
import { sendConfirmationEmail } from "@/lib/email";
import type { BookingStatus } from "@/lib/supabase";

function checkAuth(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "mentora123";
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  return auth.slice(7) === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const valid: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];
    if (!valid.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await updateBookingStatus(id, status);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (status === "confirmed") {
      await sendConfirmationEmail({
        id: booking.id,
        parent_name: booking.parent_name,
        parent_email: booking.parent_email,
        mentor_name: booking.mentor_name,
        student_name: booking.student_name,
        slot_date: booking.slot_date,
        slot_time: booking.slot_time,
        meeting_link: booking.meeting_link,
      });
    }

    return NextResponse.json({ booking });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed" },
      { status: 500 }
    );
  }
}
