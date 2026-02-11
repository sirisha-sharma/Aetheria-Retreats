import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import connectDB from "@/lib/db";
import Retreat, { type RetreatData } from "@/models/Retreat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getRetreat(slug: string) {
  await connectDB();
  const retreat = await Retreat.findOne({ slug }).lean<RetreatData>();
  if (!retreat) return null;
  return {
    id: retreat._id.toString(),
    title: retreat.title,
    location: retreat.location,
    country: retreat.country,
    pricePerNight: retreat.pricePerNight,
    durationDays: retreat.durationDays,
    capacity: retreat.capacity,
    summary: retreat.summary,
    heroImage: retreat.heroImage,
    gallery: retreat.gallery || [],
    tags: retreat.tags || [],
    highlights: retreat.highlights || []
  };
}

export default async function RetreatDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const retreat = await getRetreat(params.slug);

  if (!retreat) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-[32px] border border-white/10">
            <div className="relative h-80 w-full">
              <Image
                src={retreat.heroImage}
                alt={retreat.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
              {retreat.tags.map((tag: string) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl text-mist">
              {retreat.title}
            </h1>
            <p className="text-white/60">
              {retreat.location}, {retreat.country}
            </p>
            <p className="text-lg text-white/70">{retreat.summary}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Duration
              </p>
              <p className="mt-3 text-2xl text-mist">
                {retreat.durationDays} days
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Capacity
              </p>
              <p className="mt-3 text-2xl text-mist">
                {retreat.capacity} guests
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Rate
              </p>
              <p className="mt-3 text-2xl text-mist">
                ${retreat.pricePerNight} / night
              </p>
            </div>
          </div>

          {retreat.highlights.length > 0 && (
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Highlights
              </p>
              <ul className="mt-4 grid gap-3 text-white/70">
                {retreat.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sun" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {retreat.gallery.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {retreat.gallery.slice(0, 4).map((image) => (
                <div
                  key={image}
                  className="relative h-52 overflow-hidden rounded-3xl border border-white/10"
                >
                  <Image src={image} alt="Gallery" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Reserve your seat
            </p>
            <p className="mt-3 text-lg text-mist">
              Small groups. Real hosts. Handled by humans.
            </p>
            <div className="mt-6">
              <BookingForm retreatId={retreat.id} />
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-ink/70 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Included
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>Chef-led meals + daily ritual</li>
              <li>Private transfers from local airport</li>
              <li>Room styling + scent menu</li>
              <li>Local guide + artist session</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
