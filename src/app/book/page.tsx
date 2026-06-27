import { BookingForm } from "@/components/BookingForm";
import { getBookedSlotKeys } from "@/lib/bookings";
import { generateAvailableSlots } from "@/lib/slots";

type Props = {
  searchParams: Promise<{ mentor?: string }>;
};

export const metadata = {
  title: "Book Your Class — Mentora",
  description: "Schedule a class with an IIT or NIT mentor",
};

export default async function BookPage({ searchParams }: Props) {
  const { mentor } = await searchParams;
  const availableSlots = generateAvailableSlots(14);
  const bookedSlotKeys = Array.from(await getBookedSlotKeys());

  return (
    <div className="mx-auto max-w-2xl px-4 py-28 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Book your class now</h1>
        <p className="mt-3 text-slate-400">
          Pick a mentor, choose a time slot, and we&apos;ll send you a Jitsi meeting link.
        </p>
      </div>

      <BookingForm
        defaultMentorId={mentor}
        availableSlots={availableSlots}
        bookedSlotKeys={bookedSlotKeys}
      />
    </div>
  );
}
