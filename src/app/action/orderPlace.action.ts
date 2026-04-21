"use server";

import { orderService } from "@/services/order.service";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { cartServices } from "@/services/cart.service";
export async function placeOrderAction(formData: FormData) {
  const providerId = formData.get("providerId") as string;
  const address = formData.get("address") as string;
  const paymentMethod = formData.get("paymentMethod") as "COD" | "ONLINE";
  const items = JSON.parse(formData.get("items") as string);

  if (!address) {
    throw new Error("Delivery address is required");
  }

  const payload = { providerId, address, paymentMethod, items };

  const { data: order, error } = await orderService.createOrder(payload);

  if (error) {
    throw error;
  }
await cartServices.clearCart();

  if (paymentMethod === "COD") {
    redirect("/dashboard/payment-success");
  }

  if (paymentMethod === "ONLINE") {
    // Check what the actual order id field is
    const orderId = order?.id || order?.data?.id;
    

    if (!orderId) {
      throw new Error("Order ID missing from response");
    }

    const res = await fetch(
      `${env.BACKEND_URL}/payment/initiate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      }
    );

    console.log("Payment initiate status:", res.status);

    const json = await res.json();
    console.log("Payment initiate response:", json);

    if (!res.ok) {
      throw new Error(json.message || "Failed to initiate payment");
    }

    if (!json.url) {
      throw new Error("Payment gateway URL not received");
    }

    redirect(json.url);
  }
}