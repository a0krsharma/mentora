"use client";

import { useEffect, useState } from "react";
import { formatSlotLabel } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Booking } from "@/lib/supabase";
import { Loader2, RefreshCw, ExternalLink } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  async function fetchBookings(pwd: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/bookings", {
        headers: { Authorization: `Bearer ${pwd}` },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        throw new Error("Invalid password");
      }

      if (!res.ok) throw new Error("Failed to load bookings");

      const data = await res.json();
      setBookings(data.bookings);
      setAuthenticated(true);
      sessionStorage.setItem("mentora_admin_pwd", pwd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("mentora_admin_pwd");
    if (saved) {
      setPassword(saved);
      void fetchBookings(saved);
    }
  }, []);

  async function updateStatus(id: string, status: Booking["status"]) {
    setActionId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw new Error("Update failed");

      await fetchBookings(password);
    } catch {
      setError("Failed to update booking");
    } finally {
      setActionId(null);
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-28">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <p className="mt-2 text-sm text-slate-400">Enter your admin password to view bookings.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            fetchBookings(password);
          }}
        >
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="mt-1 text-slate-400">{bookings.length} total requests</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => fetchBookings(password)} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 space-y-4">
        {bookings.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center text-slate-400">
            No bookings yet. Share your site and book a test demo!
          </div>
        )}

        {bookings.map((b) => (
          <div key={b.id} className="glass rounded-2xl p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-1 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white">{b.student_name}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">Class {b.student_grade}</span>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-slate-400">
                  {b.parent_name} · {b.parent_email} · {b.parent_phone}
                </p>
                <p>
                  <span className="text-indigo-300">{b.mentor_name}</span> · {b.subject}
                </p>
                <p className="text-slate-400">
                  {formatSlotLabel(b.slot_date, b.slot_time)} IST
                </p>
                <a
                  href={b.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                >
                  Jitsi link <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {b.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(b.id, "confirmed")}
                    disabled={actionId === b.id}
                  >
                    Confirm
                  </Button>
                )}
                {b.status !== "cancelled" && b.status !== "completed" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateStatus(b.id, "completed")}
                    disabled={actionId === b.id}
                  >
                    Complete
                  </Button>
                )}
                {b.status !== "cancelled" && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => updateStatus(b.id, "cancelled")}
                    disabled={actionId === b.id}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const colors: Record<Booking["status"], string> = {
    pending: "bg-amber-500/20 text-amber-300",
    confirmed: "bg-emerald-500/20 text-emerald-300",
    completed: "bg-indigo-500/20 text-indigo-300",
    cancelled: "bg-red-500/20 text-red-300",
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${colors[status]}`}>
      {status}
    </span>
  );
}
