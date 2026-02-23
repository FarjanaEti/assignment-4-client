"use server";

import { cartServices } from "@/services/cart.service";
import { revalidatePath } from "next/cache";

export async function removeCartItemAction(formData: FormData) {
  const cartItemId = formData.get("cartItemId") as string;

  if (!cartItemId) {
    throw new Error("Cart item ID missing");
  }

  await cartServices.removeCartItem(cartItemId);

  // Refresh cart page data
  revalidatePath("/dashboard/cart");
}