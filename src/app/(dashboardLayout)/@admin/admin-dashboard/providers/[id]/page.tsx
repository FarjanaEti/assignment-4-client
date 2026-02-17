
import { providerService } from "@/services/provider.service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProviderDetailsPage({
  params,
}: Props) {
  const { id } = await params; 
  console.log(id)
  const { data: provider, error } =
    await providerService.getProviderById(id);
  console.log(provider)
  if (error || !provider) {
    return notFound();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {provider.restaurantName}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created at: {new Date(provider.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard label="Address" value={provider.address} />
        <InfoCard label="Phone" value={provider.phone} />
        <InfoCard label="Total Meals" value={provider.meals.length} />
      </div>

      {/* Description */}
      <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h2 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {provider.description || "No description provided."}
        </p>
      </section>

      {/* Meals */}
      <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-medium text-gray-800 dark:text-gray-200">
            Meals ({provider.meals.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {provider.meals.map((meal: any) => (
            <div key={meal.id} className="px-5 py-4 flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {meal.title}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ৳{meal.price}
              </span>
            </div>
          ))}

          {provider.meals.length === 0 && (
            <div className="px-5 py-6 text-center text-gray-500">
              No meals found.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">
        {value}
      </p>
    </div>
  );
}
