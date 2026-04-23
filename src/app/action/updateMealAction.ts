"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { env } from "@/env";

export async function updateMealAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));

    console.log("Updating meal:", { id, title, price });

    if (!title || !id || price <= 0) {
      return { success: false, error: "Invalid input data." };
    }

    // ← call API directly here, not through mealService
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    console.log("Cookie length:", cookieHeader.length);

    const res = await fetch(`${env.BACKEND_URL}/provider/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ title, price }),
      cache: "no-store",
    });

    const data = await res.json();
    console.log("PATCH response:", res.status, data);

    if (!res.ok) {
      return { success: false, error: data.message || "Update failed" };
    }

    revalidatePath("/provider-dashboard/myMenu");
    return { success: true };
  } catch (err: any) {
    console.error("Update failed:", err?.message);
    return { success: false, error: err?.message || "Server error during update." };
  }
}