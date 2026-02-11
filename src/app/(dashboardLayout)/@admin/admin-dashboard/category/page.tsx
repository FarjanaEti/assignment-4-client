import { categoryService } from "@/services/category.service";

export default async function CategoriesPage() {
  const { data: categories, error } =
    await categoryService.getAllCategories();

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load categories
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Categories
        </h1>
        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories?.map((category: any) => (
              <tr
                key={category.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.name}
                </td>

                <td className="px-6 py-4">
                  {category.isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                    Edit
                  </button>

                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Toggle
                  </button>
                </td>
              </tr>
            ))}

            {categories?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
