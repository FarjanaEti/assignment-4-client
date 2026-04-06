export const dynamic = "force-dynamic";

import Banner from "./home/banner";
import { userService } from "@/services/user.service";
import { mealService } from "@/services/meal.service";
import { reviewService } from "@/services/review.service";
import Image from "next/image";

export default async function Home() {
  await userService.getSession();

  const { data: meals } = await mealService.getAllMeals();
  const { data: reviews } = await reviewService.getAllReview();

  
  const reviewMap = reviews?.reduce((acc: any, review: any) => {
    if (!acc[review.mealId]) {
      acc[review.mealId] = [];
    }
    acc[review.mealId].push(review);
    return acc;
  }, {});

  
  const mealsWithRatings =
    meals?.map((meal: any) => {
      const mealReviews = reviewMap?.[meal.id] || [];

      const avgRating =
        mealReviews.length > 0
          ? mealReviews.reduce(
              (sum: number, r: any) => sum + r.rating,
              0
            ) / mealReviews.length
          : 0;

      // pick BEST review (highest rating)
      const bestReview = [...mealReviews].sort(
        (a: any, b: any) => b.rating - a.rating
      )[0];

      return {
        ...meal,
        avgRating,
        reviewCount: mealReviews.length,
        topComment: bestReview?.comment || "No reviews yet",
      };
    }) || [];


  const topMeals = mealsWithRatings
    .filter((meal: any) => meal.reviewCount >= 1) 
    .sort(
      (a: any, b: any) =>
        b.avgRating - a.avgRating ||
        b.reviewCount - a.reviewCount
    )
    .slice(0, 8);

  return (
    <div className="space-y-12">
      <Banner />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          Top Rated Meals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topMeals.map((meal: any) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border relative"
            >
              {/*  Badge */}
              <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                Top Rated
              </span>

              {/* Image */}
              <div className="relative h-52 w-full bg-gray-100">
                {meal.image?.startsWith("http") ||
                meal.image?.startsWith("/") ? (
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    fill
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

              {/* Content */}
              <div className="p-5 space-y-3 text-black">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {meal.title}
                </h3>

                <p className="text-sm line-clamp-2">
                  {meal.description ||
                    "No description available"}
                </p>

                {/*  Comment */}
                <p className="text-xs text-gray-500 italic line-clamp-2">
                  "{meal.topComment}"
                </p>

                {/* Price + Rating */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold">
                    ৳{meal.price}
                  </span>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.round(meal.avgRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      )
                    )}

                    {/* rating number */}
                    <span className="text-sm text-gray-600 ml-1">
                      {meal.avgRating.toFixed(1)}
                    </span>

                    {/* review count */}
                    <span className="text-sm text-gray-500 ml-1">
                      ({meal.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}