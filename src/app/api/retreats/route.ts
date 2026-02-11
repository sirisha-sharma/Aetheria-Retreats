import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Retreat from "@/models/Retreat";
import slugify from "@/lib/slugify";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const mine = url.searchParams.get("mine");
  const search = url.searchParams.get("q");

  let query: any = { status: "live" };

  if (mine) {
    const user = await requireUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    query = { host: user._id };
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const retreats = await Retreat.find(query).sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    retreats: retreats.map((retreat: any) => ({
      _id: retreat._id.toString(),
      slug: retreat.slug,
      title: retreat.title,
      location: retreat.location,
      country: retreat.country,
      pricePerNight: retreat.pricePerNight,
      durationDays: retreat.durationDays,
      heroImage: retreat.heroImage,
      tags: retreat.tags || []
    }))
  });
}

export async function POST(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    location,
    country,
    pricePerNight,
    durationDays,
    capacity,
    heroImage,
    summary,
    tags,
    highlights,
    gallery
  } = body || {};

  if (!title || !location || !country || !pricePerNight || !durationDays) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;
  while (await Retreat.findOne({ slug })) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }

  const retreat = await Retreat.create({
    title,
    slug,
    location,
    country,
    pricePerNight,
    durationDays,
    capacity: capacity || 6,
    heroImage,
    summary: summary || "",
    tags: tags || [],
    highlights: highlights || [],
    gallery: gallery || [],
    host: user._id
  });

  return NextResponse.json({ retreat });
}
