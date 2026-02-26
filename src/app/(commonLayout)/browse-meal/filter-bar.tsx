"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  const [dietType, setDietType] = useState(searchParams.get("dietType") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (cuisine) params.set("cuisine", cuisine);
    if (dietType) params.set("dietType", dietType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

     //router.push(`/browse-meal?${params.toString()}`);
     router.replace(`/browse-meal?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      {/* Cuisine */}
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Cuisines</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="Italian">Italian</option>
      </select>

      {/* Diet Type */}
      <select
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Diet Types</option>
        <option value="Veg">Veg</option>
        <option value="Vegan">Vegan</option>
        <option value="Non-Veg">Non-Veg</option>
      </select>

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      {/* Apply */}
      <button
        onClick={applyFilters}
        className="col-span-full bg-black text-white py-2 rounded hover:opacity-90"
      >
        Apply Filters
      </button>
    </div>
  );
}