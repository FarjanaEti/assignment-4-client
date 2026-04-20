import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export interface ReviewData {
  mealId: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  createReview: async function (review: ReviewData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customer/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        throw new Error("Failed to create review");
      }

      const data = await res.json();
      return { data: data.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  getAllReview: async function () {
      try {
        const cookieStore = await cookies();
  
        const res = await fetch(`${API_URL}/customer/allReview`, {
          cache: "no-store",
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch review");
        }
  
        const data = await res.json();
  
        return { data: data.data, error: null };
      } catch (err) {
        return {
          data: null,
          error: { message: "Failed to fetch review" },
        };
      }
    },

    getTopRatedMeals: async function () {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/customer/top-rated`, {
      cache: "no-store",
      headers: { Cookie: cookieStore.toString() },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return { data: data.data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch top rated meals" } };
  }
},
};