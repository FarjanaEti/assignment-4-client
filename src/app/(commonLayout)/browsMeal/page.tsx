import { Button } from "@/components/ui/button"
import { mealService } from "@/services/meal.service"
import Image from "next/image"


export default async function BrowseMeal() {
  const {data:meals} =await mealService.getAllMeals()
  console.log(meals)
  return (
    <div>
      <section className="container mx-auto px-4">
        <h2 className="text-3xl text-center mt-6 font-bold mb-8">All Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals?.map((meal: any) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border"
            >
              {/* Image */}
              <div className="relative h-52 w-full bg-gray-100">
    {meal.image?.startsWith("http") || meal.image?.startsWith("/") ? (
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
              <div className="p-5 space-y-3">
                <h3 className="text-lg text-black font-semibold line-clamp-1">
                  {meal.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {meal.description || "No description available"}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-black">
                    ৳{meal.price}
                  </span>

                  <Button size="sm">Add To Cart</Button>
                  <Button size="sm">Order</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
