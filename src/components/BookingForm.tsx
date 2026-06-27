"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mentors, subjects, grades } from "@/lib/mentors";
import { SlotPicker } from "@/components/SlotPicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { TimeSlot } from "@/lib/slots";
import { Loader2 } from "lucide-react";

type BookingFormProps = {
  defaultMentorId?: string;
  availableSlots: TimeSlot[];
  bookedSlotKeys: string[];
};

export function BookingForm({
  defaultMentorId,
  availableSlots,
  bookedSlotKeys,
}: BookingFormProps) {
  const router = useRouter();
  const [mentorId, setMentorId] = useState(defaultMentorId || mentors[0].id);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedMentor = mentors.find((m) => m.id === mentorId)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }

    const form = new FormData(e.currentTarget);

    setLoading(true);

    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorId,
          slotDate: selectedSlot.date,
          slotTime: selectedSlot.time,
          parentName: form.get("parentName"),
          parentEmail: form.get("parentEmail"),
          parentPhone: form.get("parentPhone"),
          studentName: form.get("studentName"),
          studentGrade: Number(form.get("studentGrade")),
          subject: form.get("subject"),
          bookingType: form.get("bookingType"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Booking failed");
      }

      router.push(`/thank-you?id=${data.bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">1. Choose mentor</h2>
        <Select
          className="mt-3"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
        >
          {mentors.map((m) => (
            <option key={m.id} value={m.id} className="bg-gray-900">
              {m.name} — {m.college}
            </option>
          ))}
        </Select>
        <p className="mt-2 text-sm text-slate-400">
          {selectedMentor.bio.slice(0, 120)}…
        </p>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">2. Pick a slot (IST)</h2>
        <p className="mt-1 text-sm text-slate-400">1-hour class</p>
        <div className="mt-4 max-h-72 overflow-y-auto pr-2">
          <SlotPicker
            slots={availableSlots}
            bookedKeys={bookedSlotKeys}
            selectedKey={selectedSlot?.key ?? null}
            onSelect={setSelectedSlot}
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">3. Your details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Parent name</label>
            <Input name="parentName" required placeholder="Full name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Phone</label>
            <Input name="parentPhone" required placeholder="+91 98765 43210" type="tel" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-slate-400">Email</label>
            <Input name="parentEmail" required placeholder="you@email.com" type="email" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Student name</label>
            <Input name="studentName" required placeholder="Student name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Class</label>
            <Select name="studentGrade" required defaultValue="7">
              {grades.map((g) => (
                <option key={g} value={g} className="bg-gray-900">
                  Class {g}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-slate-400">Subject</label>
            <Select name="subject" required defaultValue="Mathematics">
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-gray-900">
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-slate-400">Booking Type</label>
            <Select name="bookingType" required defaultValue="regular">
              <option value="regular" className="bg-gray-900">Regular Class</option>
              <option value="assignment" className="bg-gray-900">Assignment Help</option>
              <option value="project" className="bg-gray-900">Project Help</option>
              <option value="topic" className="bg-gray-900">Specific Topic Help</option>
            </Select>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking…
          </>
        ) : (
          "Confirm booking"
        )}
      </Button>
    </form>
  );
}
