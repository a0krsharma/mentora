import { Resend } from "resend";
import { formatSlotLabel, generateJitsiLink } from "./utils";
import type { BookingInsert } from "./supabase";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL;

type EmailPayload = {
  bookingId: string;
  booking: BookingInsert;
};

function buildParentHtml(bookingId: string, booking: BookingInsert) {
  const slotLabel = formatSlotLabel(booking.slot_date, booking.slot_time);
  const meetingLink = booking.meeting_link || generateJitsiLink(bookingId);

  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <h1 style="color: #6366f1;">Class Booked — Mentora</h1>
      <p>Hi ${booking.parent_name},</p>
      <p>Your class booking has been received. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px 0; color: #666;">Student</td><td><strong>${booking.student_name}</strong> (Class ${booking.student_grade})</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Mentor</td><td><strong>${booking.mentor_name}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Subject</td><td><strong>${booking.subject}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Slot</td><td><strong>${slotLabel} IST</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Status</td><td><strong>Pending confirmation</strong></td></tr>
      </table>
      <p>Your class meeting link (Jitsi):</p>
      <p><a href="${meetingLink}" style="color: #6366f1; word-break: break-all;">${meetingLink}</a></p>
      <p style="color: #666; font-size: 14px;">We'll confirm your slot within 24 hours. Join the link at your scheduled time once confirmed.</p>
      <p>— Team Mentora</p>
    </div>
  `;
}

function buildAdminHtml(bookingId: string, booking: BookingInsert) {
  const slotLabel = formatSlotLabel(booking.slot_date, booking.slot_time);

  return `
    <div style="font-family: sans-serif; max-width: 560px;">
      <h2>New Class Booking #${bookingId.slice(0, 8)}</h2>
      <ul>
        <li><strong>Parent:</strong> ${booking.parent_name} (${booking.parent_email}, ${booking.parent_phone})</li>
        <li><strong>Student:</strong> ${booking.student_name}, Class ${booking.student_grade}</li>
        <li><strong>Mentor:</strong> ${booking.mentor_name}</li>
        <li><strong>Subject:</strong> ${booking.subject}</li>
        <li><strong>Booking Type:</strong> ${booking.booking_type || 'Regular Class'}</li>
        <li><strong>Slot:</strong> ${slotLabel} IST</li>
        <li><strong>Meeting:</strong> ${booking.meeting_link}</li>
      </ul>
    </div>
  `;
}

export async function sendBookingEmails({ bookingId, booking }: EmailPayload) {
  if (!resend) {
    console.log("[Mentora] RESEND_API_KEY not set — skipping emails for booking", bookingId);
    return { sent: false, reason: "no_api_key" as const };
  }

  const results = [];

  try {
    const parentResult = await resend.emails.send({
      from: `Mentora <${fromEmail}>`,
      to: booking.parent_email,
      subject: `Class booked — ${booking.mentor_name} | Mentora`,
      html: buildParentHtml(bookingId, booking),
    });
    console.log("[Mentora] Parent email sent successfully to:", booking.parent_email, parentResult);
    results.push(parentResult);
  } catch (err) {
    console.error("[Mentora] Parent email failed:", err);
  }

  if (adminEmail) {
    try {
      const adminResult = await resend.emails.send({
        from: `Mentora <${fromEmail}>`,
        to: adminEmail,
        subject: `[New Booking] ${booking.student_name} — Class ${booking.student_grade}`,
        html: buildAdminHtml(bookingId, booking),
      });
      results.push(adminResult);
    } catch (err) {
      console.error("[Mentora] Admin email failed:", err);
    }
  }

  return { sent: true, results };
}

export async function sendConfirmationEmail(booking: {
  id: string;
  parent_name: string;
  parent_email: string;
  mentor_name: string;
  student_name: string;
  slot_date: string;
  slot_time: string;
  meeting_link: string;
}) {
  if (!resend) return { sent: false };

  const slotLabel = formatSlotLabel(booking.slot_date, booking.slot_time);

  await resend.emails.send({
    from: `Mentora <${fromEmail}>`,
    to: booking.parent_email,
    subject: `Class Confirmed — ${slotLabel} | Mentora`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px;">
        <h1 style="color: #6366f1;">Class Confirmed!</h1>
        <p>Hi ${booking.parent_name},</p>
        <p>Great news! ${booking.student_name}'s class with <strong>${booking.mentor_name}</strong> is confirmed.</p>
        <p><strong>When:</strong> ${slotLabel} IST</p>
        <p><strong>Join here:</strong> <a href="${booking.meeting_link}">${booking.meeting_link}</a></p>
        <p>Please join 2 minutes early. See you in class!</p>
        <p>— Team Mentora</p>
      </div>
    `,
  });

  return { sent: true };
}
