import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  //baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
   baseURL: typeof window !== "undefined" ? window.location.origin : "https://assignment4-client-lilac.vercel.app",
  fetchOptions: {
    credentials: "include"
  },
  user: {
    additionalFields: {
      role: { type: "string" },
      phone: { type: "string" },
    }
  }
});