import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import Retreat from "@/models/Retreat";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const bookings = await Booking.find({ user: user._id })
    .populate("retreat")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const body = await request.json();
  const { retreatId, startDate, endDate, guests } = body || {};

  if (!retreatId || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const retreat = await Retreat.findById(retreatId);
  if (!retreat) {
    return NextResponse.json({ error: "Retreat not found" }, { status: 404 });
  }

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const total = nights * retreat.pricePerNight;

  const booking = await Booking.create({
    retreat: retreat._id,
    user: user._id,
    startDate,
    endDate,
    guests: guests || 1,
    total
  });

  return NextResponse.json({ booking });
}
