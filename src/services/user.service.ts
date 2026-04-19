import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL!;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      
      
      const cookieHeader = allCookies
        .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
        .join("; ");

   

      const res = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
          "cache-control": "no-store",
        },
        cache: "no-store",
      });

      const session = await res.json();
    

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