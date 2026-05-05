"use client";

import { updateMealAction } from "@/app/action/updateMealAction";
import { useState, useTransition } from "react";

export default function EditMealForm({ meal }: any) {
  const [title, setTitle] = useState(meal.title);
  const [price, setPrice] = useState(meal.price);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = () => {
    setMessage(null);

    if (!title.trim()) {
      setMessage({ type: "error", text: "Title cannot be empty." });
      return;
    }
    if (price <= 0) {
      setMessage({ type: "error", text: "Price must be greater than 0." });
      return;
    }

    const formData = new FormData();
    formData.append("id", meal.id);
    formData.append("title", title.trim());
    formData.append("price", String(price));

    startTransition(async () => {
      const res = await updateMealAction(formData);
      console.log("ACTION RESPONSE:", JSON.stringify(res));
      if (!res?.success) {
        setMessage({ type: "error", text: res?.error || "Update failed. Please try again." });
      } else {
        setMessage({ type: "success", text: "Meal updated successfully!" });
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-6 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Edit Meal</h2>
        <p className="text-sm text-gray-500 mt-1">Meal ID: <span className="font-mono">{meal.id}</span></p>
      </div>

      {/* Feedback message */}
      {message && (
        <div
          className={`px-4 py-3 rounded text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Title field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Meal Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-secondary 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     placeholder:text-neutral-400 transition"
          placeholder="e.g. Grilled Chicken"
        />
      </div>

      {/* Price field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Price ($)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-secondary 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     placeholder:text-neutral-400 transition"
          placeholder="e.g. 12.99"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 
                   text-primary-foreground font-semibold py-2.5 rounded-lg transition"
      >
        {isPending ? "Updating..." : "Update Meal"}
      </button>
    </div>
  );
}