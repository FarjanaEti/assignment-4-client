import { deleteMenuAction } from "@/app/action/deleteMenuAction";
import { mealService } from "@/services/meal.service";
import Link from "next/link";



export default async function ProvidersPage() {
  const { data: meals=[] } = await mealService.getMyMeals();
  ;
console.log(meals)
  return (
    <div className="space-y-4">
      {/* Messages */}
      
      {/* Meals */}
      {meals.map((meal: any) => {
        const hasOrders = meal.orderItems?.length > 0;

        return (
          <div
            key={meal.id}
            className="group flex gap-5 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Image */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
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
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {meal.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      meal.available
                        ? "bg-accent/10 text-accent"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {meal.available ? "Available" : "Unavailable"}
                  </span>
                  
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {meal.description || "No description provided"}
                </p>

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
                      {meal._count?.reviews ?? 0}
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
                <span className="text-lg font-bold text-card-foreground">
                  ৳{meal.price}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/provider-dashboard/myMenu/${meal.id}`}
                     className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:opacity-90"
                             >
                        Edit
                  </Link>

                  {/* Delete Button */}
                  <form action={hasOrders ? undefined : deleteMenuAction}>
                    <input type="hidden" name="mealId" value={meal.id} />
                    <button
                      type="submit"
                      disabled={hasOrders}
                      className={`rounded-md px-3 py-1 text-sm transition ${
                        hasOrders
                          ? "cursor-not-allowed opacity-40 blur-[1px]"
                          : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      }`}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}