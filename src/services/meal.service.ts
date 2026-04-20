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
   page?: number;   
  limit?: number; 
};
export const mealService = {
  // GET ALL
  getAllMeals: async function (params?: GetAllMealsParams) {
    try {
      const cookieStore = await cookies();

  
      const query = new URLSearchParams();

      if (params?.search) query.set("search", params.search);
      if (params?.cuisine) query.set("cuisine", params.cuisine);
      if (params?.dietType) query.set("dietType", params.dietType);
      if (params?.minPrice !== undefined)
        query.set("minPrice", String(params.minPrice));
      if (params?.maxPrice !== undefined)
        query.set("maxPrice", String(params.maxPrice));
       if (params?.page !== undefined) query.set("page", String(params.page));     // ← ADD
      if (params?.limit !== undefined) query.set("limit", String(params.limit));

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

  const cookieHeader = cookieStore
  .getAll()
  .map(c => `${c.name}=${c.value}`)
  .join("; ");

      const res = await fetch(`${API_URL}/provider/meals/myMeals`, {
        cache: "no-store",
        headers: {
          Cookie: cookieHeader,
        },
      });

      if (!res.ok) {
       console.error("getMyMeals failed:", res.status);
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (err) {
      return {
        data: [],
        error: { message: "Failed to fetch meal" },
      };
    }
  },
//provider update meal
  async updateMeal(id: string, payload: { title: string; price: number }) {
   const cookieStore = await cookies();

const cookieHeader = cookieStore
  .getAll()
  .map(c => `${c.name}=${c.value}`)
  .join("; ");

   console.log("URL:", `${API_URL}/provider/meals/${id}`);
  console.log("Cookie header length:", cookieHeader.length); // 0 = no cookies = auth failing
  console.log("Payload:", payload);

    const res = await fetch(`${API_URL}/provider/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
       const errorBody = await res.text(); // read the actual error from your API
    console.error("API error body:", errorBody);
      throw new Error("Update failed");
    }

    return res.json();
  },

  //delete meal 
  deleteMeal: async function (mealId: string) {
    try {
      const cookieStore = await cookies();
const cookieHeader = cookieStore
  .getAll()
  .map(c => `${c.name}=${c.value}`)
  .join("; ");
  
      const res = await fetch(`${API_URL}/provider/meals/${mealId}`, {
        method: "DELETE",
         credentials: "include",
        headers: {
          Cookie: cookieHeader,
        },
      });
  
      const data = await res.json();
      if (!res.ok) {
  throw new Error(data.message || "Failed to delete meal");
} 
      return { success: false, error: "Delete failed" };
    } catch (error) {
  console.error("Delete meal failed:", error);
 
}

  },
}
