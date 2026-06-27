import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateJitsiLink(bookingId: string): string {
  const room = `mentora-class-${bookingId.slice(0, 8)}`;
  return `https://meet.jit.si/${room}`;
}

export function formatSlotLabel(date: string, time: string): string {
  const d = new Date(`${date}T${time}:00`);
  return d.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}
