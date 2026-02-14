import { providerService } from "@/services/provider.service";

export default async function Restaurants() {
  const { data } = await providerService.getAllProviders();
  const providers = data?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Restaurants
        </h1>

        {providers.map((provider: any) => (
          <section
            key={provider.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            {/* ================= Provider Header ================= */}
            <div className="bg-yellow-800 text-white p-8">
              <h2 className="text-3xl font-bold">
                {provider.restaurantName}
              </h2>

              <p className="mt-2 text-yellow-100 max-w-3xl">
                {provider.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <span> {provider.address}</span>
                <span> {provider.meals.length} items</span>
              </div>
            </div>

            {/* ================= Menu Section ================= */}
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Menu
              </h3>

              {provider.meals.length === 0 ? (
                <p className="text-gray-500">
                  No menu items available.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.meals.map((meal: any) => (
                    <div
                      key={meal.id}
                      className={`border rounded-2xl overflow-hidden transition ${
                        meal.available
                          ? "hover:shadow-md"
                          : "opacity-60"
                      }`}
                    >
                      {/* Image */}
                      <div className="h-44 bg-gray-100 flex items-center justify-center">
                        {meal.image ? (
                          <img
                            src={meal.image}
                            alt={meal.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm text-gray-400">
                            No image
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {meal.title}
                        </h4>

                        {meal.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {meal.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-3">
                          <span className="font-bold text-yellow-800">
                            ৳ {meal.price}
                          </span>

                          {meal.available ? (
                            <button className="text-sm px-4 py-2 rounded-lg bg-yellow-800 text-white hover:bg-yellow-700 transition">
                              View
                            </button>
                          ) : (
                            <span className="text-sm text-red-500 font-medium">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= CTA ================= */}
              <div className="mt-10 text-right">
                <a
                  href={`/restaurants/${provider.id}`}
                  className="inline-block text-yellow-800 font-semibold hover:underline"
                >
                  View full restaurant →
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
