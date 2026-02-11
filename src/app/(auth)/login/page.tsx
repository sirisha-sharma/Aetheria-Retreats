"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get("email"),
      password: form.get("password")
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-16 md:grid-cols-[1fr_0.8fr]">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Welcome back</p>
        <h1 className="font-display text-4xl text-mist">Log in to Host Studio.</h1>
        <p className="text-white/60">
          Manage your retreats, keep track of bookings, and update the mood of
          your listing.
        </p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-xs uppercase tracking-[0.3em] text-white/50">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-white/50">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist"
            />
          </label>
          {error && <p className="text-sm text-sun">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="button button-primary w-full"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-white/60">
          New here?{" "}
          <Link href="/register" className="text-mist underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
