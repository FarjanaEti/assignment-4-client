"use server";

import { orderService } from "@/services/order.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;

  await orderService.updateOrderStatus(orderId, status);

  revalidatePath("/provider-dashboard/orders");

  redirect("/provider-dashboard/orders?updated=1");
}