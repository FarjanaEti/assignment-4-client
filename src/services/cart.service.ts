import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const cartServices={
  createCart: async function (payload: {
    mealId: string;
    quantity?: number;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customer/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          mealId: payload.mealId,
          quantity: payload.quantity ?? 1,
        }),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to create cart");
        
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },                        
 getMyOrders: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customer/allCart`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch cart" },
      };
    }
  },
  removeCartItem: async function (cartItemId: string) {
    const cookieStore = await cookies();

    const res = await fetch(
      `${API_URL}/customer/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to remove cart item");
    }

    return res.json();
  },
}