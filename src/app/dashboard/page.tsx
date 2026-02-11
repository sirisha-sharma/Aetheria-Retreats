"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Retreat = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  country: string;
  pricePerNight: number;
  durationDays: number;
  heroImage: string;
  tags: string[];
};

export default function DashboardPage() {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [ready, setReady] = useState(false);

  const loadRetreats = useCallback(async () => {
    const res = await fetch("/api/retreats?mine=1", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setRetreats(data.retreats || []);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data?.user ?? null);
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (user) loadRetreats();
  }, [user, loadRetreats]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"),
      location: form.get("location"),
      country: form.get("country"),
      pricePerNight: Number(form.get("pricePerNight")),
      durationDays: Number(form.get("durationDays")),
      capacity: Number(form.get("capacity")),
      heroImage: form.get("heroImage"),
      summary: form.get("summary"),
      tags: String(form.get("tags") || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      highlights: String(form.get("highlights") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      gallery: String(form.get("gallery") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    const res = await fetch("/api/retreats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus("Retreat created.");
      (event.target as HTMLFormElement).reset();
      loadRetreats();
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(data?.error || "Couldn't create retreat.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Host Studio
        </p>
        <h1 className="font-display text-4xl text-mist">Your retreats.</h1>
        <p className="mt-2 text-white/60">
          Create, refine, and publish your next experience.
        </p>
      </div>

      {!ready ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          Checking your session...
        </div>
      ) : !user ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          Log in to access the Host Studio.{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Create retreat
              </p>
              <form onSubmit={handleCreate} className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Title
                  <input
                    name="title"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Location
                  <input
                    name="location"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Country
                  <input
                    name="country"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Price / night
                  <input
                    name="pricePerNight"
                    type="number"
                    min={50}
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Duration (days)
                  <input
                    name="durationDays"
                    type="number"
                    min={2}
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Capacity
                  <input
                    name="capacity"
                    type="number"
                    min={1}
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                  />
                </label>
              </div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Hero image URL
                <input
                  name="heroImage"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Summary
                <textarea
                  name="summary"
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Tags (comma separated)
                <input
                  name="tags"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Highlights (one per line)
                <textarea
                  name="highlights"
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Gallery URLs (one per line)
                <textarea
                  name="gallery"
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
                />
              </label>

              {status && <p className="text-sm text-white/70">{status}</p>}
              <button
                type="submit"
                disabled={loading}
                className="button button-primary w-full"
              >
                {loading ? "Saving..." : "Publish retreat"}
              </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Your listings
            </p>
            {retreats.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
                No retreats yet. Create one on the left.
              </div>
            ) : (
              retreats.map((retreat) => (
                <div
                  key={retreat._id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-display text-xl text-mist">
                    {retreat.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {retreat.location}, {retreat.country}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                    <span>${retreat.pricePerNight} / night</span>
                    <Link href={`/retreats/${retreat.slug}`} className="underline">
                      View listing
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
