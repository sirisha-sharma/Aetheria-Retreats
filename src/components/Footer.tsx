import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.3em]">Aetheria</p>
          <p className="mt-3 text-sm text-white/60">
            A private curation studio for retreats that feel like a soft reset.
          </p>
        </div>
        <div className="text-sm text-white/60">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/50">
            Explore
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/retreats" className="hover:text-white">
              Retreats
            </Link>
            <Link href="/dashboard" className="hover:text-white">
              Host Studio
            </Link>
            <Link href="/register" className="hover:text-white">
              Join Aetheria
            </Link>
          </div>
        </div>
        <div className="text-sm text-white/60">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/50">
            Contact
          </p>
          <div className="flex flex-col gap-2">
            <span>hello@aetheria.studio</span>
            <span>Lisbon • Kyoto • Santa Fe</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © 2026 Aetheria Retreats. Crafted with quiet intention.
      </div>
    </footer>
  );
}
