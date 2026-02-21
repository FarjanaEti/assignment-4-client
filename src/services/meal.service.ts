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
      console.log(data)
     return {
  data: data.data ?? [],
  pagination: data.pagination,
  error: null,
};
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch meal" },
      };
    }
  },
  //providers own meals 
  getMyMeals: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/provider/meals/myMeals`, {
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

  //delete meal 
  deleteMeal: async function (mealId: string) {
    try {
      const cookieStore = await cookies();
  
      const res = await fetch(`${API_URL}/provider/meals/${mealId}`, {
        method: "DELETE",
         credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
  
      const data = await res.json();
      if (!res.ok) {
  throw new Error(data.message || "Failed to delete meal");
}

  
      return { success: true };
    } catch (error) {
  console.error("Delete meal failed:", error);
  throw error;
}

  },
}
