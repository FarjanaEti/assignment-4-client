"use server";

import { cookies } from "next/headers";

export async function beProviderAction(formData: FormData) {
  const payload = {
    restaurantName: formData.get("businessName"),
    address: formData.get("location"),
    phone: formData.get("contactNumber"),
    description: formData.get("description"),
  };

  try {
    const cookieStore =await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${process.env.BACKEND_URL}/provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to become provider");
    }

    return { success: true, message: "You are now a provider!" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}