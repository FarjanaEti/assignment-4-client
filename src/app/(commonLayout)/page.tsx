export const dynamic = "force-dynamic";

import Banner from "./home/banner";
import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import { reviewService } from "@/services/review.service";
import ReviewSection from "@/components/review-section";
import Image from "next/image";
import FAQSection from "@/components/layout/FAQ";
import { categoryService } from "@/services/category.service";
import CategoriesSection from "@/components/CategoriesSection";
import OfferSection from "@/components/OfferSection";
import MealCard from "@/components/MealCard";

export default async function Home() {
  await userService.getSession();

  const { data: topRated } = await reviewService.getTopRatedMeals();
  const { data: mostOrdered } = await orderService.getMostOrderedMeals();
  const { data: categories } = await categoryService.getAllCategories();

  return (
    <div className="space-y-12">
      <Banner />

      {/* TOP RATED SECTION */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">⭐ Top Rated Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRated?.map((item: any) => (
            <MealCard 
              key={item.mealId} 
              meal={{
                ...item.meal,
                id: item.mealId,
              }} 
            />
          ))}

          {!topRated?.length && (
            <p className="text-gray-400 col-span-4">No rated meals yet</p>
          )}
        </div>
      </section>

      {/* MOST ORDERED SECTION */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold mb-8">🔥 Most Ordered Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mostOrdered?.map((item: any) => (
            <MealCard 
              key={item.mealId} 
              meal={{
                ...item.meal,
                id: item.mealId,
              }} 
            />
          ))}

          {!mostOrdered?.length && (
            <p className="text-gray-400 col-span-4">No orders yet</p>
          )}
        </div>
      </section>

      <OfferSection />

      {categories?.length > 0 && <CategoriesSection categories={categories} />}

      {/* REVIEW & FAQ SECTION */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ReviewSection />
          <FAQSection />
        </div>
      </section>
    </div>
  );
}