 //import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_URL;

export interface CategoryData {
  name: string;
  isActive: boolean;
}

export const categoryService = {
  // GET ALL
  getAllCategories: async function () {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();

const cookieHeader = allCookies
  .map((c) => `${c.name}=${c.value}`)
  .join("; ");

      const res = await fetch(`${API_URL}/category/categories`, {
        cache: "no-store",
        headers: {
          Cookie: cookieHeader,
        },
      });

      console.log("Status:", res.status);
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();
      console.log("data:", data);
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
      const allCookies = cookieStore.getAll();

const cookieHeader = allCookies
  .map((c) => `${c.name}=${c.value}`)
  .join("; ");

      const res = await fetch(`${API_URL}/category/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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
      const allCookies = cookieStore.getAll();

const cookieHeader = allCookies
  .map((c) => `${c.name}=${c.value}`)
  .join("; ");

      const res = await fetch(`${API_URL}/category/categories/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieHeader,
        },
      });

      const data = await res.json();

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Toggle failed" } };
    }
  },
};
