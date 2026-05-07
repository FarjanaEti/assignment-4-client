"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { trackMealEvent } from "@/lib/recommendations";

interface WishlistButtonProps {
  meal: {
    id: string;
    title: string;
    image: string;
    price: number;
    description?: string;
  };
  className?: string;
}

export default function WishlistButton({ meal, className }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("foodhub-wishlist") || "[]");
    const exists = wishlist.some((item: any) => item.id === meal.id);
    setIsWishlisted(exists);
  }, [meal.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("foodhub-wishlist") || "[]");
    let newWishlist;

    if (isWishlisted) {
      newWishlist = wishlist.filter((item: any) => item.id !== meal.id);
      toast.success("Removed from wishlist");
      trackMealEvent("wishlist_remove", meal);
    } else {
      newWishlist = [...wishlist, meal];
      toast.success("Added to wishlist");
      trackMealEvent("wishlist", meal);
    }

    localStorage.setItem("foodhub-wishlist", JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);

    // Dispatch custom event for cross-tab or cross-component sync
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        "absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300",
        "bg-white/80 backdrop-blur-md shadow-sm hover:scale-110 active:scale-95",
        isWishlisted ? "text-red-500 bg-white" : "text-gray-400 hover:text-red-400",
        className
      )}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={20}
        fill={isWishlisted ? "currentColor" : "none"}
        className={cn("transition-colors duration-300", isWishlisted && "fill-red-500")}
      />
    </button>
  );
}
