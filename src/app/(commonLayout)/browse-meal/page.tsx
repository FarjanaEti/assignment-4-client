export const dynamic = "force-dynamic";
import { addToCartAction } from "@/app/action/addToCart.action";
import { Button } from "@/components/ui/button";
import { mealService } from "@/services/meal.service";
import Image from "next/image";
import FilterBar from "./filter-bar";
import { notFound } from "next/navigation";


type PageProps = {
  searchParams: Promise<{
    search?: string;
    cuisine?: string;
    dietType?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};


export default async function BrowseMeal({ searchParams }: PageProps) {
    const params = await searchParams; 
  console.log("PARAMS:",params);
  const { data: meals } = await mealService.getAllMeals({
     search: params.search,
    cuisine: params.cuisine,
    dietType: params.dietType,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  if (!meals) {
  notFound(); 
}

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl text-center mt-6 font-bold mb-6">
        Browse Meals
      </h2>

      {/*  Filters */}
      <FilterBar />

      {/* Meals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {meals?.map((meal: any) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border"
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
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold text-black line-clamp-1">
                {meal.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {meal.description || "No description available"}
              </p>

              <p className="text-sm">
                <strong>Cuisine:</strong> {meal.cuisine || "N/A"}
              </p>

              <p className="text-sm">
                <strong>Diet:</strong> {meal.dietType || "N/A"}
              </p>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xl font-bold text-black">
                  ৳{meal.price}
                </span>

                <form action={addToCartAction}>
                  <input type="hidden" name="mealId" value={meal.id} />
                  <Button size="sm" type="submit">
                    Add To Cart
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}