// src/app/api/auth/[...all]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://assignment4-backend-red.vercel.app";

async function handler(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/auth", "");
  const url = `${BACKEND_URL}/api/auth${path}${req.nextUrl.search}`;

  console.log("=== PROXY DEBUG ===");
  console.log("Incoming path:", req.nextUrl.pathname);
  console.log("Forwarding to:", url);
  console.log("Cookies:", req.headers.get("cookie"));

  try {
    const res = await fetch(url, {
      method: req.method,
      headers: {
        "content-type": req.headers.get("content-type") || "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      body: req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
    });

    console.log("Backend response status:", res.status);
    const resBody = await res.text();
    console.log("Backend response body:", resBody);

    const response = new NextResponse(resBody, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json",
      },
    });

    res.headers.getSetCookie?.().forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });

    return response;
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy failed", details: String(err) }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
