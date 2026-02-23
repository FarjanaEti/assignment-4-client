"use server";

import { cartServices } from "@/services/cart.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCartAction(formData: FormData) {
  console.log("cart clicked"); 

  const mealId = formData.get("mealId") as string;

  if (!mealId) {
    throw new Error("Meal ID missing");
  }

  await cartServices.createCart({
    mealId,
    quantity: 1,
  });


  redirect("/dashboard/cart?added=true");
}