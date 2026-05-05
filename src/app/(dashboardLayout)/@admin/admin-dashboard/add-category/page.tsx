"use client";

import { createCategoryAction } from "@/app/action/category.action";
import { useState } from "react";


export default function AddCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ---------------- Submit Handler ---------------- */
  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const res = await createCategoryAction(formData);

    setLoading(false);
    setMessage(res.message);
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-xl mx-auto bg-card p-6 rounded-xl shadow text-card-foreground">
      <h1 className="text-xl font-semibold mb-4">Add Category</h1>

      {message && (
        <p
          className={`mb-3 text-lg ${
            message.includes("success")
              ? "text-accent"
              : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}

      <form action={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Category name"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Active toggle (your design preserved) */}
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Active (visible to customers)
          </span>
          <input
            type="checkbox"
            name="isActive"
            defaultChecked
            className="h-5 w-5"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}