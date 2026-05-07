"use client";

import Link from "next/link";
import { useSession } from "@/hooks/userSession";
import { useRecommendations } from "@/hooks/useRecommendations";
import { Loader2, ArrowRight } from "lucide-react";

interface RecommendedForYouProps {
  orders?: any[];
  cartItems?: any[];
}

export default function RecommendedForYou({ orders = [], cartItems = [] }: RecommendedForYouProps) {
  const { data, loading: sessionLoading } = useSession();
  const { recommendations, loading } = useRecommendations({ orders, cartItems });

  if (sessionLoading) {
    return null;
  }

  const user = data?.user;
  if (!user || user.role !== "CUSTOMER") {
    return null;
  }

  if (!recommendations.length && !loading) {
    return (
      <section className="bg-card rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Recommended For You</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">Your meal suggestions</h2>
          </div>
          <Link
            href="/browse-meal"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:border-accent"
          >
            Explore meals
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="rounded-3xl border border-border bg-muted p-8 text-center text-muted-foreground">
          No personalized recommendations could be generated yet. Start browsing meals to build your taste profile.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Recommended For You</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">Meals hand-picked for your taste</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Based on your recent activity, cart, wishlist and order history.
          </p>
        </div>

        <Link
          href="/browse-meal"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:border-accent"
        >
          See full menu
          <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="mt-6 rounded-3xl border border-border bg-muted p-8 text-center text-muted-foreground">
          <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-accent" />
          Gathering meal ideas for you...
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((meal) => (
            <Link
              key={meal.id}
              href={`/browse-meal?search=${encodeURIComponent(meal.title)}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44 overflow-hidden bg-muted">
                {meal.image ? (
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground">
                    {meal.category || meal.cuisine || "Recommended"}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {meal.rating ? meal.rating.toFixed(1) : "New"}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">{meal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{meal.reason}</p>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                  <span>৳{meal.price?.toFixed?.(0) ?? meal.price ?? "--"}</span>
                  <span className="text-accent">Suggested</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
