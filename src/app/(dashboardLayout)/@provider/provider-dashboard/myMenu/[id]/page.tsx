import EditMealForm from "@/components/EditMealForm";
import { mealService } from "@/services/meal.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
   const { id } = await params; 
  try {
    const res = await mealService.getMyMeals();
    console.log("FETCH RESULT:", res);
    // 🔒 defensive check
    if (!res || !res.data) {
      throw new Error("Failed to fetch meals");
    }

    const meals = res.data;

    const meal = res.data.find((m: any) => m.id === id);

    if (!meal) {
      notFound();
    }

    const safeMeal = {
      id: meal.id,
      title: meal.title,
      price: meal.price,
    };

    return <EditMealForm meal={safeMeal} />;
  } catch (error) {
    console.error("EDIT PAGE ERROR:", error);
    throw error; 
  }
}