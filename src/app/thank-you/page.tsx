import Link from "next/link";
import { CheckCircle, Video, Calendar } from "lucide-react";
import { getBookingById } from "@/lib/bookings";
import { formatSlotLabel } from "@/lib/utils";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const booking = id ? await getBookingById(id) : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle className="h-8 w-8 text-emerald-400" />
      </div>

      <h1 className="mt-6 text-3xl font-bold">Congratulations!</h1>
      <p className="mt-3 text-slate-400">
        Your class is booked! We&apos;ve sent a confirmation email with your meeting details. Our team will
        confirm your slot within 24 hours.
      </p>

      {booking && (
        <div className="glass mt-8 rounded-2xl p-6 text-left">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
              <div>
                <p className="text-slate-400">Scheduled slot</p>
                <p className="font-medium">
                  {formatSlotLabel(booking.slot_date, booking.slot_time)} IST
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Video className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
              <div>
                <p className="text-slate-400">Meeting link (Jitsi)</p>
                <a
                  href={booking.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-medium text-indigo-400 hover:text-indigo-300"
                >
                  {booking.meeting_link}
                </a>
              </div>
            </div>
            <p className="border-t border-white/10 pt-3 text-slate-400">
              Mentor: <span className="text-white">{booking.mentor_name}</span> ·{" "}
              {booking.student_name}, Class {booking.student_grade}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium transition hover:bg-white/10"
        >
          Back to home
        </Link>
        <Link
          href="/mentors"
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse more mentors
        </Link>
      </div>
    </div>
  );
}
