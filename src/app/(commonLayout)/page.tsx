export const dynamic = "force-dynamic";

import Banner from "./home/banner";
import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import { reviewService } from "@/services/review.service";
import ReviewSection from "@/components/review-section";
import Image from "next/image";
import FAQSection from "@/components/layout/FAQ";

export default async function Home() {
  await userService.getSession();

  const { data: topRated } = await reviewService.getTopRatedMeals();
  const { data: mostOrdered } = await orderService.getMostOrderedMeals();

  return (
    <div className="space-y-12">
      <Banner />

      {/* TOP RATED SECTION */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">⭐ Top Rated Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRated?.map((item: any) => (
            <div
              key={item.mealId}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border relative"
            >
              <span className="absolute top-2 left-2 bg-primary/15 text-primary text-xs px-2 py-1 rounded z-10">
                Top Rated
              </span>

              <div className="relative h-52 w-full bg-neutral-100">
                {item.meal?.image ? (
                  <Image
                    src={item.meal.image}
                    alt={item.meal.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder-food.jpeg"
                    alt="placeholder"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-5 space-y-3 text-secondary">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {item.meal?.title}
                </h3>

                <p className="text-sm line-clamp-2">
                  {item.meal?.description || "No description available"}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold">৳{item.meal?.price}</span>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.round(item.avgRating) ? "text-primary" : "text-neutral-300"}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {item.avgRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
          {mostOrdered?.map((item: any, index: number) => (
            <div
              key={item.mealId}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border relative"
            >
              <span className="absolute top-2 left-2 bg-primary/15 text-primary text-xs px-2 py-1 rounded z-10">
                {index === 0 ? "🥇 Best Seller" : index === 1 ? "🥈 Popular" : index === 2 ? "🥉 Trending" : "🔥 Hot"}
              </span>

              <div className="relative h-52 w-full bg-neutral-100">
                {item.meal?.image ? (
                  <Image
                    src={item.meal.image}
                    alt={item.meal.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder-food.jpeg"
                    alt="placeholder"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-5 space-y-3 text-secondary">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {item.meal?.title}
                </h3>

                <p className="text-sm line-clamp-2">
                  {item.meal?.description || "No description available"}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold">৳{item.meal?.price}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">
                      {item.totalQuantity} sold
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.orderCount} orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!mostOrdered?.length && (
            <p className="text-gray-400 col-span-4">No orders yet</p>
          )}
        </div>
      </section>

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