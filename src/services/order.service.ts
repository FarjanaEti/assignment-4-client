import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const orderService = {
//customer post order
createOrder: async function (payload: {
    providerId: string;
    address: string;
     paymentMethod: "COD" | "ONLINE"; 
    items: {
      mealId: string;
      quantity: number;
    }[];
  }) {
    try {
      const cookieStore = await cookies();
   

       const cookieHeader = cookieStore.getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  //  CUSTOMER 
  getMyOrders: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/myOrders`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch orders" },
      };
    }
  },

  // PROVIDER 

  getProviderOrders: async function () {
    try {
      const cookieStore = await cookies();
        
      const res = await fetch(`${API_URL}/order/providerOrders`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch provider orders");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch provider orders" },
      };
    }
  },

  //  ADMIN 

  getAllOrders: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/allOrders`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch all orders");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch all orders" },
      };
    }
  },

  //  ORDER DETAILS 

  getOrderById: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/${id}`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await res.json();

      return { data: data.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch order details" },
      };
    }
  },

  //  UPDATE STATUS (Provider/Admin)
  updateOrderStatus: async (id: string, status: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    return { data: data.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Update failed" },
    };
  }
},
};
