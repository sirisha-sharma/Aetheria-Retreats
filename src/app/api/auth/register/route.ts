import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { setAuthCookie, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body || {};

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: "host" });

  const token = signToken({ id: user._id.toString(), email: user.email });
  const response = NextResponse.json({
    user: { id: user._id.toString(), name: user.name, email: user.email }
  });

  setAuthCookie(response, token);
  return response;
}
