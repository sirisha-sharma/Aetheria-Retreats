import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Retreat from "@/models/Retreat";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const retreat = await Retreat.findById(params.id).lean();
  if (!retreat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ retreat });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const retreat = await Retreat.findById(params.id);
  if (!retreat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (String(retreat.host) !== String(user._id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates = await request.json();
  Object.assign(retreat, updates);
  await retreat.save();

  return NextResponse.json({ retreat });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const retreat = await Retreat.findById(params.id);
  if (!retreat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (String(retreat.host) !== String(user._id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await retreat.deleteOne();
  return NextResponse.json({ ok: true });
}
