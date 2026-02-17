"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type CategoryFormData = {
  name: string;
  isActive: boolean;
};

export default function AddCategoryPage() {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.name.trim()) {
      setMessage("Category name is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            isActive: formData.isActive,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Failed to create category");
      }

      setMessage("Category added successfully.");
      setFormData({ name: "", isActive: true });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow text-black">
      <h1 className="text-xl font-semibold mb-4">Add Category</h1>

      {message && <p className="mb-3 text-green-700 text-lg">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category name"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Active toggle */}
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Active (visible to customers)
          </span>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-800 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
