import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
export const TOKEN_NAME = "aetheria_token";

export function signToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function setAuthCookie(response: { cookies: { set: Function } }, token: string) {
  const cookies = response.cookies;
  cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
}

export function clearAuthCookie(response: { cookies: { set: Function } }) {
  const cookies = response.cookies;
  cookies.set(TOKEN_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
}

export function getTokenFromRequest(req: NextRequest) {
  return req.cookies.get(TOKEN_NAME)?.value;
}

export async function requireUser(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    await connectDB();
    const user = await User.findById(decoded.id).select("-password");
    return user;
  } catch {
    return null;
  }
}
