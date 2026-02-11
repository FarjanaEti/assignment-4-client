import { providerService } from "@/services/provider.service";

export default async function ProvidersPage() {
  const { data, error } = await providerService.getAllProviders(
    { page: "1", limit: "10" },
    { cache: "no-store" }
  );

  if (error) {
    return (
      <div className="p-6 text-red-500 font-medium">
        Failed to load providers.
      </div>
    );
  }

  const providers = data?.data || [];

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Providers
        </h1>
        <span className="text-sm text-gray-500">
          Total: {data?.pagination?.total}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Meals</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {providers.map((provider: any) => (
              <tr
                key={provider.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {provider.restaurantName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {provider.address}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {provider.phone}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {provider._count?.meals ?? 0}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {provider._count?.orders ?? 0}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {providers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
