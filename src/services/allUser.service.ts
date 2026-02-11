import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const allUserService = {
  // GET ALL USERS
  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },

  // TOGGLE ACTIVE
  toggleUserStatus: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Toggle failed" } };
    }
  },

  // CHANGE ROLE
  updateUserRole: async function (id: string, role: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Role update failed" } };
    }
  },
};
