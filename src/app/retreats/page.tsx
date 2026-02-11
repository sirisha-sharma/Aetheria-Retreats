import RetreatCard, { RetreatCardData } from "@/components/RetreatCard";
import connectDB from "@/lib/db";
import Retreat from "@/models/Retreat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getRetreats(): Promise<RetreatCardData[]> {
  await connectDB();
  const retreats = await Retreat.find({ status: "live" })
    .sort({ createdAt: -1 })
    .limit(24)
    .lean();

  return retreats.map((retreat: any) => ({
    _id: retreat._id.toString(),
    slug: retreat.slug,
    title: retreat.title,
    location: retreat.location,
    country: retreat.country,
    pricePerNight: retreat.pricePerNight,
    durationDays: retreat.durationDays,
    heroImage: retreat.heroImage,
    tags: retreat.tags || []
  }));
}

export default async function RetreatsPage() {
  const retreats = await getRetreats();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Retreats
          </p>
          <h1 className="font-display text-4xl text-mist">Browse the edit</h1>
          <p className="mt-2 text-white/60">
            Small, intentional journeys with room to breathe.
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
          {retreats.length} active
        </div>
      </div>

      {retreats.length === 0 ? (
        <div className="card">
          <p className="text-lg text-mist">No retreats yet.</p>
          <p className="mt-2 text-sm text-white/60">
            Log in and create the first listing from the Host Studio.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {retreats.map((retreat) => (
            <RetreatCard key={retreat.slug} retreat={retreat} />
          ))}
        </div>
      )}
    </div>
  );
}
