"use client";

import { MouseEvent } from "react";

export interface MealSuggestion {
  id: string;
  title: string;
  description?: string;
  category?: string;
  cuisine?: string;
  dietType?: string;
  tags?: string[];
}

interface SuggestionDropdownProps {
  suggestions: MealSuggestion[];
  query: string;
  activeIndex: number;
  onSelect: (meal: MealSuggestion) => void;
  onMouseEnter: (index: number) => void;
  noResults: boolean;
  loading: boolean;
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.substring(0, index)}
      <span className="font-semibold text-amber-700">{text.substring(index, index + query.length)}</span>
      {text.substring(index + query.length)}
    </>
  );
};

export default function SuggestionDropdown({
  suggestions,
  query,
  activeIndex,
  onSelect,
  onMouseEnter,
  noResults,
  loading,
}: SuggestionDropdownProps) {
  return (
    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-200/80 transition duration-200 ease-out">
      <div className="space-y-1 p-2">
        {loading ? (
          <div className="rounded-2xl px-4 py-4 text-sm text-slate-500">Loading meals…</div>
        ) : noResults ? (
          <div className="rounded-2xl px-4 py-4 text-sm text-slate-500">No matching meals found</div>
        ) : (
          suggestions.map((meal, index) => (
            <button
              type="button"
              key={meal.id}
              onClick={() => onSelect(meal)}
              onMouseEnter={() => onMouseEnter(index)}
              className={`flex w-full flex-col items-start gap-1 rounded-3xl px-4 py-3 text-left transition ${
                index === activeIndex ? "bg-slate-100" : "hover:bg-slate-50"
              }`}
            >
              <span className="font-semibold text-slate-900">
                {highlightMatch(meal.title, query)}
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {meal.category && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                    {highlightMatch(meal.category, query)}
                  </span>
                )}
                {meal.cuisine && (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">
                    {highlightMatch(meal.cuisine, query)}
                  </span>
                )}
                {meal.dietType && (
                  <span className="rounded-full border border-yellow-200 bg-yellow-50 px-2 py-1 text-yellow-900">
                    {highlightMatch(meal.dietType, query)}
                  </span>
                )}
              </div>
              {meal.description ? (
                <p className="text-xs text-slate-500 line-clamp-2">
                  {highlightMatch(meal.description, query)}
                </p>
              ) : null}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
