"use client";

import { useState } from "react";

export default function BookingForm({ retreatId }: { retreatId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      retreatId,
      startDate: form.get("startDate"),
      endDate: form.get("endDate"),
      guests: Number(form.get("guests"))
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus("Booked. We'll email the itinerary in 24 hours.");
      (event.target as HTMLFormElement).reset();
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(data?.error || "Couldn't book that. Try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/50">
          Start
          <input
            type="date"
            name="startDate"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.3em] text-white/50">
          End
          <input
            type="date"
            name="endDate"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
          />
        </label>
      </div>
      <label className="text-xs uppercase tracking-[0.3em] text-white/50">
        Guests
        <input
          type="number"
          name="guests"
          min={1}
          max={10}
          defaultValue={2}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="button button-primary w-full"
      >
        {loading ? "Booking..." : "Request booking"}
      </button>
      {status && <p className="text-sm text-white/70">{status}</p>}
    </form>
  );
}
