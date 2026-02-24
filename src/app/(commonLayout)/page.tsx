import Banner from "./home/banner";
import { userService } from "@/services/user.service";
import { mealService } from "@/services/meal.service";
import Image from "next/image";

function getAverageRating(reviews: any[]) {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce(
    (sum, r) => sum + r.rating,
    0
  );
  return total / reviews.length;
}

export default async function Home() {
  await userService.getSession();

  const { data: meals } = await mealService.getAllMeals();

  // 🔥 Compute rating + sort + take top 8
  const topMeals =
    meals
      ?.map((meal: any) => ({
        ...meal,
        avgRating: getAverageRating(meal.reviews),
        reviewCount: meal.reviews?.length || 0,
      }))
      .sort((a: any, b: any) => b.avgRating - a.avgRating)
      .slice(0, 8) || [];

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
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border"
            >
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

                {/* Rating */}
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