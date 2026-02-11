import Image from "next/image";
import Link from "next/link";

export type RetreatCardData = {
  _id?: string;
  slug: string;
  title: string;
  location: string;
  country: string;
  pricePerNight: number;
  durationDays: number;
  heroImage: string;
  tags: string[];
};

export default function RetreatCard({ retreat }: { retreat: RetreatCardData }) {
  return (
    <Link
      href={`/retreats/${retreat.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-card transition-all hover:-translate-y-1"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={retreat.heroImage}
          alt={retreat.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
          {retreat.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-xl text-mist">{retreat.title}</h3>
          <p className="text-sm text-white/60">
            {retreat.location}, {retreat.country}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{retreat.durationDays} days</span>
          <span className="text-mist">${retreat.pricePerNight} / night</span>
        </div>
      </div>
    </Link>
  );
}
