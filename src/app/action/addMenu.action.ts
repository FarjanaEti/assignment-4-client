"use server";

import { cookies } from "next/headers";

export async function createMenuAction(formData: FormData) {
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    categoryId: formData.get("categoryId"),
    cuisine: formData.get("cuisine"),
    dietType: formData.get("dietType"),
    image: formData.get("image"),
  };

  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(
      `${process.env.BACKEND_URL}/provider/meals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to add menu");
    }

    return { success: true, message: "Meal added successfully!" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}