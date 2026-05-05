export const dynamic = "force-dynamic";
import { providerService } from "@/services/provider.service";

export default async function Restaurants() {
  const { data } = await providerService.getAllProviders();
  const providers = data?.data || [];

  const stars = (avg: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(avg) ? "text-primary" : "text-neutral-300"}>
        ★
      </span>
    ));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <h1 className="text-4xl font-extrabold mx-auto text-center text-secondary">
          Restaurants
        </h1>

        {providers.map((provider: any) => {
          const allReviews = provider.meals.flatMap((m: any) => m.reviews ?? []);
          const avgRating =
            allReviews.length > 0
              ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
              : 0;
          const totalReviews = allReviews.length;

          return (
            <section key={provider.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">

              {/* Provider Header — two column layout */}
              <div className="bg-primary text-primary-foreground p-8 flex justify-between items-start gap-8 flex-wrap">

                {/* LEFT: Info */}
                <div className="flex-1 min-w-50">
                  <p className="text-xs tracking-widest opacity-70 mb-1 uppercase text-neutral-200">Restaurant</p>
                  <h2 className="text-3xl font-bold mb-2">{provider.restaurantName}</h2>
                  <p className="text-primary-foreground/80 max-w-xl text-sm leading-relaxed mb-4">
                    {provider.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm opacity-75">
                    <span>{provider.address}</span>
                    <span>{provider.meals.length} items on menu</span>
                   
                  </div>
                </div>

                {/* RIGHT: Rating Card */}
                <div className="bg-white/10 rounded-2xl p-5 text-center min-w-40 shrink-0">
                  {totalReviews > 0 ? (
                    <>
                      <p className="text-5xl font-bold leading-none">{avgRating.toFixed(1)}</p>
                      <div className="flex justify-center text-xl mt-2 tracking-wider">
                        {stars(avgRating)}
                      </div>
                      <p className="text-xs opacity-70 mt-2">{totalReviews} reviews</p>
                    </>
                  ) : (
                    <>
                      <p className="text-4xl font-bold leading-none opacity-40">—</p>
                      <div className="flex justify-center text-xl mt-2 tracking-wider opacity-30">
                        ★★★★★
                      </div>
                      <p className="text-xs opacity-50 mt-2">No reviews yet</p>
                    </>
                  )}
                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-around gap-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{provider._count?.orders ?? 0}</p>
                      <p className="text-xs opacity-60">orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{provider.meals.length}</p>
                      <p className="text-xs opacity-60">meals</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Section */}
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Our Menu</h3>

                {provider.meals.length === 0 ? (
                  <p className="text-gray-500">No menu items available.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {provider.meals.map((meal: any) => {
                      const mealAvg =
                        meal.reviews?.length > 0
                          ? meal.reviews.reduce((s: number, r: any) => s + r.rating, 0) / meal.reviews.length
                          : 0;

                      return (
                        <div
                          key={meal.id}
                          className={`border rounded-2xl overflow-hidden transition ${
                            meal.available ? "hover:shadow-md" : "opacity-60"
                          }`}
                        >
                          <div className="h-44 bg-neutral-100 flex items-center justify-center">
                            {meal.image ? (
                              <img
                                src={meal.image}
                                alt={meal.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-sm text-neutral-400">No image</span>
                            )}
                          </div>

                          <div className="p-4 space-y-2">
                            <h4 className="font-semibold text-lg text-gray-900">{meal.title}</h4>

                            {meal.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
                            )}

                            {meal.reviews?.length > 0 && (
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <span key={i} className={i < Math.round(mealAvg) ? "text-primary" : "text-neutral-300"}>
                                    ★
                                  </span>
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  {mealAvg.toFixed(1)} ({meal.reviews.length})
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-3">
                              <span className="font-bold text-primary">৳ {meal.price}</span>
                              {meal.available ? (
                                <button className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
                                  View
                                </button>
                              ) : (
                                <span className="text-sm text-red-500 font-medium">Unavailable</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                
              </div>

            </section>
          );
        })}
      </div>
    </div>
  );
}