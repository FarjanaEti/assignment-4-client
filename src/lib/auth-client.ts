import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  //baseURL: "https://assignment4-backend-red.vercel.app",
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