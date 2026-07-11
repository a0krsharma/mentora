"use client";

import { useState, useEffect } from "react";
import { format, startOfDay, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/lib/slots";

type SlotPickerProps = {
  slots: TimeSlot[];
  bookedKeys: string[];
  selectedKey: string | null;
  onSelect: (slot: TimeSlot) => void;
};

export function SlotPicker({ slots, bookedKeys, selectedKey, onSelect }: SlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Get available dates from slots
  const availableDates = Array.from(
    new Set(slots.map((s) => s.date))
  ).sort();

  // Get available times for selected date
  const availableTimes = selectedDate
    ? slots
        .filter((s) => s.date === selectedDate)
        .filter((s) => !bookedKeys.includes(s.key))
        .map((s) => s.time)
        .sort()
    : [];

  // Initialize from selectedKey
  useEffect(() => {
    if (selectedKey) {
      const [date, time] = selectedKey.split("_");
      setSelectedDate(date);
      setSelectedTime(time);
    }
  }, [selectedKey]);

  // Handle date selection
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  // Handle time selection
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const slot = slots.find((s) => s.date === selectedDate && s.time === time);
      if (slot) onSelect(slot);
    }
  };

  const minDate = format(startOfDay(new Date()), "yyyy-MM-dd");
  const maxDate = format(addDays(new Date(), 14), "yyyy-MM-dd");

  if (availableDates.length === 0) {
    return (
      <p className="text-sm text-slate-400">No slots available. Please check back tomorrow.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-slate-400">Select Date</label>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {selectedDate && (
        <div>
          <label className="mb-2 block text-sm text-slate-400">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => {
                const slotKey = `${selectedDate}_${time}`;
                const isBooked = bookedKeys.includes(slotKey);
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBooked}
                    onClick={() => handleTimeChange(time)}
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm transition",
                      isBooked &&
                        "cursor-not-allowed border-white/5 bg-white/5 text-slate-600 line-through",
                      !isBooked &&
                        !isSelected &&
                        "border-white/10 bg-white/5 text-slate-300 hover:border-indigo-500/50 hover:text-white",
                      isSelected &&
                        "border-indigo-500 bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500"
                    )}
                  >
                    {time}
                  </button>
                );
              })
            ) : (
              <p className="col-span-3 text-sm text-slate-400">No available times for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
