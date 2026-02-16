import { mealService } from "@/services/meal.service";


export default async function ProvidersPage() {
  const { data:meals, error } = await mealService.getMyMeals()
  // console.log(data)
 return(
  <div className="space-y-4">
      {meals.map((meal:any) => (
        <div
          key={meal.id}
          className="group flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          {/* Image */}
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={meal.image || "/placeholder-food.png"}
              alt={meal.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {meal.title}
                </h3>

                {/* Status */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    meal.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {meal.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                {meal.description || "No description provided"}
              </p>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                <span>
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {meal.category?.name}
                  </span>
                </span>
                <span>
                  Reviews:{" "}
                  <span className="font-medium text-gray-700">
                    {meal._count.reviews}
                  </span>
                </span>
                <span>
                  Created:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(meal.createdAt).toLocaleDateString()}
                  </span>
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ৳{meal.price}
              </span>

              <div className="flex gap-2  text-black ">
                <button className="rounded-md bg-yellow-900 border text-white px-3 py-1 text-sm hover:bg-gray-50">
                 Edit
                </button>
                <button className="rounded-md border bg-yellow-900 text-white px-3 py-1 text-sm ">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}