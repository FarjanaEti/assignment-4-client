import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL!;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      
      console.log("All cookies raw:", allCookies);
      
      const cookieHeader = allCookies
        .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
        .join("; ");

      console.log("AUTH_URL:", AUTH_URL);
      console.log("Cookie header string:", cookieHeader);

      const res = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
          "cache-control": "no-store",
        },
        cache: "no-store",
      });

      const session = await res.json();
      console.log("Session response:", JSON.stringify(session));

      if (session?.user) {
        return { data: session, error: null };
      }

      return { data: null, error: { message: "No session" } };
    } catch (err) {
      console.error("Session error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};