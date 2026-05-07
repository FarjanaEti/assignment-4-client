"use client";

import { useEffect, useMemo, useState } from "react";
import { buildRecommendations, getBehaviorState, RecommendationResult } from "@/lib/recommendations";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UseRecommendationsProps = {
  orders?: any[];
  cartItems?: any[];
};

const fetchFallbackMeals = async () => {
  if (!API_URL) return [];

  const endpoints = ["/provider/meals?limit=50"];
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) continue;
      const payload = await res.json();
      const data = payload?.data ?? [];
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      continue;
    }
  }

  return [];
};

export function useRecommendations({ orders = [], cartItems = [] }: UseRecommendationsProps) {
  const [fallbackMeals, setFallbackMeals] = useState<any[]>([]);
  const [behavior, setBehavior] = useState(getBehaviorState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchFallbackMeals()
      .then((meals) => {
        if (!active) return;
        setFallbackMeals(meals);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const updateBehavior = () => setBehavior(getBehaviorState());
    updateBehavior();

    window.addEventListener("storage", updateBehavior);
    window.addEventListener("foodhub-behavior-updated", updateBehavior);

    return () => {
      window.removeEventListener("storage", updateBehavior);
      window.removeEventListener("foodhub-behavior-updated", updateBehavior);
    };
  }, []);

  const recommendations: RecommendationResult[] = useMemo(() => {
    if (!fallbackMeals.length && !behavior.viewed.length && !orders.length && !cartItems.length) {
      return [];
    }

    return buildRecommendations(behavior, orders, [...fallbackMeals, ...behavior.wishlist, ...behavior.cart]);
  }, [behavior, fallbackMeals, orders, cartItems]);

  return { recommendations, loading };
}
