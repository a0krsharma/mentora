import { addDays, format, isBefore, startOfDay } from "date-fns";

export const SLOT_TIMES = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
] as const;

export type TimeSlot = {
  date: string;
  time: string;
  key: string;
};

export function generateAvailableSlots(daysAhead = 14): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = startOfDay(new Date());

  for (let d = 1; d <= daysAhead; d++) {
    const date = addDays(today, d);
    const dateStr = format(date, "yyyy-MM-dd");
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) continue;

    for (const time of SLOT_TIMES) {
      const slotDate = new Date(`${dateStr}T${time}:00`);
      if (isBefore(slotDate, new Date())) continue;

      slots.push({
        date: dateStr,
        time,
        key: `${dateStr}_${time}`,
      });
    }
  }

  return slots;
}

export function groupSlotsByDate(slots: TimeSlot[]): Record<string, TimeSlot[]> {
  return slots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});
}
