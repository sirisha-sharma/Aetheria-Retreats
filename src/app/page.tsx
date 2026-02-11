import Link from "next/link";
import RetreatCard from "@/components/RetreatCard";
import { featuredRetreats } from "@/lib/featured";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise" />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="badge w-fit">Curated retreat house</div>
          <div className="space-y-6">
            <h1 className="font-display text-4xl leading-tight text-mist md:text-6xl">
              Retreats that feel like a soft reset.
            </h1>
            <p className="text-balance text-lg text-white/70">
              Aetheria collects slow, quiet places where time expands. Each
              experience is hosted by artists, chefs, and healers who know how to
              hold a room.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/retreats" className="button button-primary">
              Browse retreats
            </Link>
            <Link href="/register" className="button button-ghost">
              Become a host
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm text-white/60 md:grid-cols-3">
            <div>
              <p className="text-2xl text-mist">42</p>
              <p>Retreats worldwide</p>
            </div>
            <div>
              <p className="text-2xl text-mist">7 days</p>
              <p>Average duration</p>
            </div>
            <div>
              <p className="text-2xl text-mist">92%</p>
              <p>Return guests</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-12 h-60 w-60 rounded-full bg-sun/30 blur-3xl" />
          <div className="absolute -bottom-10 right-0 h-60 w-60 rounded-full bg-sea/30 blur-3xl" />
          <div className="glass relative z-10 grid gap-6 rounded-[32px] p-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Next departure
              </p>
              <p className="mt-4 font-display text-2xl text-mist">
                Cedar Moon · Kyoto
              </p>
              <p className="text-sm text-white/60">
                Oct 12–18 · 6 days · 12 seats
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Host spotlight
              </p>
              <p className="mt-3 text-lg text-mist">
                Chef Rina blends seasonal cuisine + tea ceremony for a deep
                reset.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Mood
              </p>
              <p className="mt-3 text-lg text-mist">
                Salt air, cedar steam, slow journaling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-haze py-16" id="story">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              The Aetheria story
            </p>
            <h2 className="font-display text-3xl text-mist md:text-4xl">
              We curate for people who want less noise.
            </h2>
            <p className="text-lg text-white/70">
              Every retreat is vetted for atmosphere, rhythm, and hospitality. No
              crowded itineraries — just the right pacing and the right people.
            </p>
            <div className="grid gap-4 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-sun" />
                Slow mornings, long tables, and small groups.
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-sea" />
                Hosts who craft the mood, not just the itinerary.
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-moss" />
                Nature-first locations with room to breathe.
              </div>
            </div>
          </div>

          <div className="grid-lines rounded-[32px] border border-white/10 bg-ink/60 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  Rituals
                </p>
                <p className="mt-3 text-lg text-mist">Sunrise tea, no phones.</p>
                <p className="text-sm text-white/60">
                  A clean rhythm to gently rebuild attention.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  Spaces
                </p>
                <p className="mt-3 text-lg text-mist">Historic homes + wild land.</p>
                <p className="text-sm text-white/60">
                  Architecture that feels held by the place.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  The house standard
                </p>
                <p className="mt-3 text-lg text-mist">
                  We cap retreats at 14 guests and staff every experience
                  end-to-end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Featured retreats
            </p>
            <h2 className="font-display text-3xl text-mist md:text-4xl">
              The quiet luxury edit
            </h2>
          </div>
          <Link href="/retreats" className="text-sm text-white/60 hover:text-mist">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredRetreats.map((retreat) => (
            <RetreatCard key={retreat.slug} retreat={retreat} />
          ))}
        </div>
      </section>

      <section className="bg-ink/70 py-20" id="journal">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Aetheria journal
            </p>
            <h2 className="font-display text-3xl text-mist md:text-4xl">
              A monthly dispatch on places that slow time.
            </h2>
            <p className="text-white/70">
              Notes from the field, playlists from our hosts, and a few rituals
              you can bring home.
            </p>
            <form className="flex flex-wrap gap-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-mist md:w-64"
              />
              <button className="button button-primary">Subscribe</button>
            </form>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "The quietest coves in southern Portugal",
                note: "Aetheria notebook · 6 min"
              },
              {
                title: "How to build a slow morning ritual",
                note: "Field guide · 4 min"
              },
              {
                title: "Sound baths for people who hate sound baths",
                note: "Studio notes · 5 min"
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm text-white/70">{item.note}</p>
                <p className="mt-2 text-lg text-mist">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
