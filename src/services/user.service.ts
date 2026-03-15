import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL!;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies();
      const cookieHeader = cookieStore.toString();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
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