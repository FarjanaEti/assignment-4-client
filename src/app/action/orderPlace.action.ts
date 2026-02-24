"use server";

import { orderService } from "@/services/order.service";



export async function placeOrderAction(formData: FormData) {
  const providerId = formData.get("providerId") as string;
  const address = formData.get("address") as string;
  const items = JSON.parse(formData.get("items") as string);

  if (!address) {
    throw new Error("Delivery address is required");
  }

  const payload = {
    providerId,
    address,
    items,
  };

  const { error } = await orderService.createOrder(payload);

  if (error) {
    throw error;
  }
}