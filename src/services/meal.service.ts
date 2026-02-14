import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export interface MealData {
  name: string;
}

export const mealService = {
  // GET ALL
  getAllMeals: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/meals`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch meal");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch meal" },
      };
    }
  },
}