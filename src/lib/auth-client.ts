import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:4000",
  // You must mirror the additional fields on the client
  user: {
    additionalFields: {
      role: { type: "string" },
      phone: { type: "string" },
    }
  }
});