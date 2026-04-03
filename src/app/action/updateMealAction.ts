"use server";

import { mealService } from "@/services/meal.service";
import { revalidatePath } from "next/cache";

export async function updateMealAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));

    // Fixed: price check uses > 0 instead of falsy check
    if (!title || !id || price <= 0) {
      return { success: false, error: "Invalid input data." };
    }

    await mealService.updateMeal(id, { title, price });

    revalidatePath("/provider-dashboard/myMenu");

    return { success: true };
  } catch (err: any) {
    console.error("Update failed:", err);
      console.error("message:", err?.message);
    console.error("status:", err?.status);
    return { success: false, error: err?.message || "Server error during update." };
  }
}