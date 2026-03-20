"use server";

import { cookies } from "next/headers";

export async function toggleCategoryAction(id: string) {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(
      `${process.env.BACKEND_URL}/category/categories/${id}`,
      {
        method: "PATCH",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Action failed");
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}