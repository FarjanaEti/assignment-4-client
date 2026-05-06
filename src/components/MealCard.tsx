"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WishlistButton from "./WishlistButton";
import { ShoppingCart } from "lucide-react";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  cuisine?: string;
  dietType?: string;
}

interface MealCardProps {
  meal: Meal;
  showDetails?: boolean;
}

export default function MealCard({ meal, showDetails = false }: MealCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-border group relative">
      {/* Wishlist Button */}
      <WishlistButton meal={meal} />

      {/* Image Section */}
      <div className="relative h-52 w-full bg-muted overflow-hidden">
        {meal.image?.startsWith("http") || meal.image?.startsWith("/") ? (
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <img
            src="/placeholder-food.jpeg"
            alt="placeholder"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {meal.title}
          </h3>
          {showDetails && (
            <div className="flex gap-2 mt-1">
              {meal.cuisine && (
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {meal.cuisine}
                </span>
              )}
              {meal.dietType && (
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {meal.dietType}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {meal.description || "Indulge in our carefully prepared culinary masterpiece."}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
            <span className="text-xl font-black text-card-foreground">৳{meal.price}</span>
          </div>
          
          <Button size="sm" className="rounded-xl font-bold gap-2">
            <ShoppingCart size={16} />
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
