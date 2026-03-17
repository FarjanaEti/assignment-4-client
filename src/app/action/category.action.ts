"use server";

import { categoryService } from "@/services/category.service";

export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("isActive") === "on";

  if (!name || !name.trim()) {
    return { success: false, message: "Category name is required." };
  }

  const { data, error } = await categoryService.createCategory({
    name: name.trim(),
    isActive,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Category added successfully." };
}