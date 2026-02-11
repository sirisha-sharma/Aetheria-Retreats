"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SessionUser = {
  name: string;
  email: string;
} | null;

export default function Nav() {
  const [user, setUser] = useState<SessionUser>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let ignore = false;

    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore) {
          setUser(data?.user ?? null);
        }
      })
      .finally(() => {
        if (!ignore) setReady(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full border border-white/20 bg-white/10" />
          <div>
            <p className="font-display text-lg tracking-[0.2em]">Aetheria</p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Retreats
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <Link href="/retreats" className="hover:text-white">
            Retreats
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Host Studio
          </Link>
          <a href="#story" className="hover:text-white">
            Story
          </a>
          <a href="#journal" className="hover:text-white">
            Journal
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {!ready ? (
            <span className="text-xs text-white/50">Loading</span>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-white/50"
              >
                Studio
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:bg-white/20"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-white/50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-mist px-4 py-2 text-xs uppercase tracking-[0.3em] text-ink hover:-translate-y-0.5 hover:shadow-lg"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
