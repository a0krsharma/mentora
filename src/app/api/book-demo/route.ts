import { NextRequest, NextResponse } from "next/server";
import { getMentorById } from "@/lib/mentors";
import { createBooking, updateMeetingLink } from "@/lib/bookings";
import { sendBookingEmails } from "@/lib/email";
import { generateJitsiLink } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      mentorId,
      slotDate,
      slotTime,
      parentName,
      parentEmail,
      parentPhone,
      studentName,
      studentGrade,
      subject,
      bookingType,
      childInfo,
    } = body;

    if (
      !mentorId ||
      !slotDate ||
      !slotTime ||
      !parentName ||
      !parentEmail ||
      !parentPhone ||
      !studentName ||
      !studentGrade ||
      !subject ||
      !bookingType
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const mentor = getMentorById(mentorId);
    if (!mentor) {
      return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    }

    const { booking } = await createBooking({
      mentor_id: mentorId,
      mentor_name: mentor.name,
      slot_date: slotDate,
      slot_time: slotTime,
      parent_name: String(parentName).trim(),
      parent_email: String(parentEmail).trim().toLowerCase(),
      parent_phone: String(parentPhone).trim(),
      student_name: String(studentName).trim(),
      student_grade: Number(studentGrade),
      subject: String(subject),
      booking_type: String(bookingType),
      child_info: childInfo ? String(childInfo).trim() : null,
      status: "pending",
      meeting_link: "",
      notes: null,
    });

    const meetingLink = generateJitsiLink(booking.id);
    await updateMeetingLink(booking.id, meetingLink);
    booking.meeting_link = meetingLink;

    await sendBookingEmails({
      bookingId: booking.id,
      booking: {
        ...booking,
        meeting_link: meetingLink,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      meetingLink,
    });
  } catch (err) {
    console.error("[book-demo]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Booking failed" },
      { status: 500 }
    );
  }
}
