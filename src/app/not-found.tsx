import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-white/50">Not found</p>
      <h1 className="mt-4 font-display text-4xl text-mist">This path is quiet.</h1>
      <p className="mt-3 text-white/60">
        The page you want isn&apos;t here. Let&apos;s get you back to the edit.
      </p>
      <Link href="/" className="button button-primary mt-6">
        Back home
      </Link>
    </div>
  );
}
