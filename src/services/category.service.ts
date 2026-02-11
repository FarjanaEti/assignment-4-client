import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export interface CategoryData {
  name: string;
}

export const categoryService = {
  // GET ALL
  getAllCategories: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch categories" },
      };
    }
  },

  // CREATE
  createCategory: async function (category: CategoryData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(category),
      });

      const data = await res.json();

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Create failed" } };
    }
  },

  // TOGGLE ACTIVE
  toggleCategory: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories/${id}`, {
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
};
