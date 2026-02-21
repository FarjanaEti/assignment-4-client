"use server";

import { revalidatePath } from "next/cache";
import { mealService } from "@/services/meal.service";

export async function deleteMenuAction(formData: FormData) {
  const mealId = formData.get("mealId")?.toString();
  if (!mealId) return;

  try {
    await mealService.deleteMeal(mealId);
    revalidatePath("/provider-dashboard/myMenu/myMenu"); 
  } catch (error) {
    console.error("Failed to delete meal:", error);
   
  }
}