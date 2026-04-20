export const dynamic = "force-dynamic";
import { addToCartAction } from "@/app/action/addToCart.action";
import { Button } from "@/components/ui/button";
import { mealService } from "@/services/meal.service";
import Image from "next/image";
import FilterBar from "./filter-bar";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    cuisine?: string;
    dietType?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
};

export default async function BrowseMeal({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data: meals, pagination } = await mealService.getAllMeals({
    search: params.search,
    cuisine: params.cuisine,
    dietType: params.dietType,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    page: currentPage,
    limit: 12,
  });

  if (!meals) return notFound();

  // Build URL for pagination keeping existing filters
  const buildPageUrl = (page: number) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.cuisine) query.set("cuisine", params.cuisine);
    if (params.dietType) query.set("dietType", params.dietType);
    if (params.minPrice) query.set("minPrice", params.minPrice);
    if (params.maxPrice) query.set("maxPrice", params.maxPrice);
    query.set("page", String(page));
    return `?${query.toString()}`;
  };

  return (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-3xl text-center mt-6 font-bold mb-6">Browse Meals</h2>

      <FilterBar />

      {/* Results count */}
      {pagination && (
        <p className="text-sm text-gray-500 mt-4 mb-2">
          Showing {(currentPage - 1) * 12 + 1}–{Math.min(currentPage * 12, pagination.total)} of {pagination.total} meals
        </p>
      )}

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {meals.length === 0 && (
          <div className="col-span-4 text-center py-20 text-gray-400">
            <p className="text-lg">No meals found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        {meals.map((meal: any) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border"
          >
            <div className="relative h-52 w-full bg-gray-100">
              {meal.image?.startsWith("http") || meal.image?.startsWith("/") ? (
                <Image src={meal.image} alt={meal.title} fill className="object-cover" />
              ) : (
                <img src="/placeholder-food.jpeg" alt="placeholder" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold text-black line-clamp-1">{meal.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{meal.description || "No description available"}</p>
              <p className="text-sm"><strong>Cuisine:</strong> {meal.cuisine || "N/A"}</p>
              <p className="text-sm"><strong>Diet:</strong> {meal.dietType || "N/A"}</p>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xl font-bold text-black">৳{meal.price}</span>
                <form action={addToCartAction}>
                  <input type="hidden" name="mealId" value={meal.id} />
                  <Button size="sm" type="submit">Add To Cart</Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {/* Prev */}
          {currentPage > 1 ? (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm border rounded-lg text-gray-300 cursor-not-allowed">← Prev</span>
          )}

          {/* Page numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - currentPage) <= 1)
            .reduce((acc: (number | string)[], p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-3 py-2 text-sm text-gray-400">...</span>
              ) : (
                <Link
                  key={p}
                  href={buildPageUrl(p as number)}
                  className={`px-4 py-2 text-sm border rounded-lg ${
                    currentPage === p
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {p}
                </Link>
              )
            )}

          {/* Next */}
          {currentPage < pagination.totalPages ? (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm border rounded-lg text-gray-300 cursor-not-allowed">Next →</span>
          )}
        </div>
      )}
    </section>
  );
}