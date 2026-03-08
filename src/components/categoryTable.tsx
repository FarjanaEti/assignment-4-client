"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function CategoryTable({ categories }: any) {
  const router = useRouter();
const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const toggleCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/category/categories/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Action failed");
      return;
    }

     router.refresh(); 
  };

  const handleDelete = async (id: string) => {
  if (!confirm("Deactivate this category?")) return;

  const res = await fetch(`${API_URL}/category/categories/${id}`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) {
    alert("Action failed");
    return;
  }

  // hide from UI only
  setHiddenIds(prev => [...prev, id]);
};
  

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {categories 
           .filter((cat: any) => !hiddenIds.includes(cat.id))
          .map((category: any ) => (
            <tr key={category.id}>
              <td className="px-6 py-4 text-center font-medium">
                {category.name}
              </td>

              <td className="px-6 py-4 text-center">
                {category.isActive ? "Active" : "Inactive"}
              </td>

              <td className="px-6 text-center py-4">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="text-blue-600 mr-4"
                >
                  {category.isActive ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={!category.isActive}
                  className="text-red-600 disabled:opacity-40"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
