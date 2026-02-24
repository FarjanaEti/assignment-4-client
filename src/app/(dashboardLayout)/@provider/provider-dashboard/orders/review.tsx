"use client";

import { useState } from "react";
import { createReviewAction } from "@/app/action/review.action";

export default function ReviewModal({ mealId }: { mealId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Leave Review
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            action={async (formData) => {
              try {
                setError(null);
                await createReviewAction(formData);
                setOpen(false);
              } catch (err: any) {
                setError(err.message || "Something went wrong");
              }
            }}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
          >
            <h2 className="text-lg font-semibold">Rate this meal</h2>

            {/* REQUIRED */}
            <input type="hidden" name="mealId" value={mealId} />

            <select
              name="rating"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select rating</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              name="comment"
              placeholder="Write your review (optional)"
              className="w-full border rounded px-3 py-2"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}