"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import SuggestionDropdown, { MealSuggestion } from "./SuggestionDropdown";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onOptionSelect?: (meal: MealSuggestion) => void;
  placeholder?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const MAX_SUGGESTIONS = 8;
const RESULTS_LIMIT = 300;

const normalize = (value: string) => value.trim().toLowerCase();

const scoreSuggestion = (meal: MealSuggestion, query: string) => {
  const text = [
    meal.title,
    meal.category,
    meal.cuisine,
    meal.dietType,
    meal.description,
    ...(meal.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!query || !text.includes(query)) return -1;

  if (meal.title.toLowerCase().startsWith(query)) return 100;
  if (meal.category?.toLowerCase().startsWith(query)) return 80;
  if (meal.cuisine?.toLowerCase().startsWith(query)) return 75;
  if (meal.dietType?.toLowerCase().startsWith(query)) return 70;
  if (text.includes(` ${query}`)) return 60;
  return 50;
};

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onOptionSelect,
  placeholder = "Search meals...",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(value);
  const [meals, setMeals] = useState<MealSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (!API_URL) return;
    let canceled = false;

    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/provider/meals?limit=${RESULTS_LIMIT}`);
        if (!response.ok) {
          throw new Error("Failed to load meals");
        }

        const payload = await response.json();
        const data = Array.isArray(payload?.data) ? payload.data : payload?.data?.data ?? [];

        if (!canceled) {
          setMeals(
            data.map((meal: any) => ({
              id: meal.id,
              title: meal.title || meal.name || "",
              description: meal.description || meal.summary || "",
              category: meal.category?.name || meal.category || "",
              cuisine: meal.cuisine || "",
              dietType: meal.dietType || meal.type || "",
              tags: meal.tags || meal.keywords || [],
            }))
          );
        }
      } catch (error) {
        console.error("SearchBar fetch failed", error);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchMeals();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const normalizedQuery = normalize(query);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return meals
      .map((meal) => ({
        meal,
        score: scoreSuggestion(meal, normalizedQuery),
      }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SUGGESTIONS)
      .map(({ meal }) => meal);
  }, [meals, normalizedQuery]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    onChange(value);
    setIsOpen(Boolean(value.trim()));
    setActiveIndex(-1);
  };

  const navigateToSearch = (term: string) => {
    if (!term.trim()) return;
    router.push(`/browse-meal?search=${encodeURIComponent(term.trim())}`);
  };

  const handleSelect = (meal: MealSuggestion) => {
    onChange(meal.title);
    setQuery(meal.title);
    setIsOpen(false);
    if (onOptionSelect) {
      onOptionSelect(meal);
      return;
    }
    navigateToSearch(meal.title);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    } else {
      navigateToSearch(query);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) {
      if (event.key === "Enter") {
        setIsOpen(false);
        if (onSubmit) {
          onSubmit();
        } else {
          navigateToSearch(query);
        }
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
    }

    if (event.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        event.preventDefault();
        handleSelect(suggestions[activeIndex]);
      } else {
        setIsOpen(false);
        if (onSubmit) {
          onSubmit();
        } else {
          navigateToSearch(query);
        }
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-800" />
          <input
            type="text"
            value={query}
            onChange={(event) => handleInputChange(event.target.value)}
            onFocus={() => setIsOpen(Boolean(query.trim()))}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full rounded-3xl border border-slate-300 bg-white px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-yellow-800 focus:ring-2 focus:ring-yellow-200"
          />
        </div>
      </form>

      {isOpen && (
        <SuggestionDropdown
          suggestions={suggestions}
          query={query}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onMouseEnter={setActiveIndex}
          noResults={!loading && normalizedQuery.length > 0 && suggestions.length === 0}
          loading={loading}
        />
      )}
    </div>
  );
}
