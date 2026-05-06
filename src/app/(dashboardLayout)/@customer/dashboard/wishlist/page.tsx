"use client";

import React, { useEffect, useState } from "react";
import MealCard from "@/components/MealCard";
import { Heart, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CustomerWishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("foodhub-wishlist") || "[]");
    setWishlist(savedWishlist);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    // Listen for changes from other components/tabs
    const handleUpdate = () => loadWishlist();
    window.addEventListener("wishlist-updated", handleUpdate);
    return () => window.removeEventListener("wishlist-updated", handleUpdate);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Loading your favorites...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-card rounded-[2rem] border-2 border-dashed border-border shadow-sm">
        <div className="bg-primary/5 p-6 rounded-full mb-6">
          <Heart size={64} className="text-primary/20 fill-primary/5" />
        </div>
        <h2 className="text-3xl font-black mb-4">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
          Looks like you haven't saved any meals yet. Start exploring our menu 
          and save the dishes that catch your eye!
        </p>
        <Link href="/browse-meal">
          <Button className="rounded-2xl px-8 py-6 font-bold text-lg gap-3 hover:scale-105 transition-transform">
            Explore Menu
            <ArrowRight size={20} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-2 bg-primary rounded-full" />
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              My <span className="text-primary">Wishlist</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              You have {wishlist.length} items saved for later
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <Utensils size={16} className="text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Saved Delights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((meal) => (
          <MealCard key={meal.id} meal={meal} showDetails={true} />
        ))}
      </div>
    </div>
  );
}