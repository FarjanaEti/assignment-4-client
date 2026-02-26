import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export interface MealData {
  name: string;
}
type GetAllMealsParams = {
  search?: string;
  cuisine?: string;
  dietType?: string;
  minPrice?: number;
  maxPrice?: number;
};
export const mealService = {
  // GET ALL
  getAllMeals: async function (params?: GetAllMealsParams) {
    try {
      const cookieStore = await cookies();

      //  Build query string safely
      const query = new URLSearchParams();

      if (params?.search) query.set("search", params.search);
      if (params?.cuisine) query.set("cuisine", params.cuisine);
      if (params?.dietType) query.set("dietType", params.dietType);
      if (params?.minPrice !== undefined)
        query.set("minPrice", String(params.minPrice));
      if (params?.maxPrice !== undefined)
        query.set("maxPrice", String(params.maxPrice));

      const url = `${API_URL}/provider/meals${
        query.toString() ? `?${query.toString()}` : ""
      }`;

      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await res.json();

      return {
        data: data.data ?? [],
        pagination: data.pagination ?? null,
        error: null,
      };
    } catch (err) {
      return {
        data: [],
        pagination: null,
        error: { message: "Failed to fetch meals" },
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
