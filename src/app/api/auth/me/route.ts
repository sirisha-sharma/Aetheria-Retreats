import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: { id: user._id.toString(), name: user.name, email: user.email }
  });
}
