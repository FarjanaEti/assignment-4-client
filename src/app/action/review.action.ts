"use server";

import { reviewService } from "@/services/review.service";
import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const mealId = formData.get("mealId") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string | undefined;

  

  if (!mealId || !rating) {
    throw new Error("Invalid review data");
  }

  const { error } = await reviewService.createReview({
    mealId,
    rating,
    comment,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/orders");
}