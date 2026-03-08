export const dynamic = "force-dynamic";
import CategoryTable from "@/components/categoryTable";
import { categoryService } from "@/services/category.service";
import Link from "next/link";

export default async function CategoriesPage() {
  const { data: categories, error } =
    await categoryService.getAllCategories();

  if (error) {
    return <div className="p-6 text-red-500">Failed to load categories</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">
          Manage Categories
        </h1>

        <Link
          href="/admin-dashboard/add-category"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Add Category
        </Link>
      </div>

      <CategoryTable   categories={categories || []} />
    </div>
  );
}
