// /app/api/auth/sign-out/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("better-auth.session_token", "", {
    maxAge: 0,
    path: "/",
  });
  return res;
}
