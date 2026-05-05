"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { Pizza, Salad, Dessert, Sandwich, Coffee, IceCream, Utensils, Soup, Cake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

const categoryIcons: Record<string, any> = {
  //"Fast Food": Burger,
  "Healthy": Salad,
  "Desserts": Cake,
  "Pizza": Pizza,
  "Ice Cream": IceCream,
  "Coffee": Coffee,
  "Drinks": Coffee,
  "Bakery": Cake,
  "Traditional": Utensils,
  "Snacks": Sandwich,
};

export default function CategoriesSection({ categories }: { categories: Category[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter for active categories from backend
  const activeCategories = categories.filter(cat => cat.isActive);

  useGSAP(() => {
    if (!containerRef.current || activeCategories.length === 0) return;

    const scrollWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const moveAmount = Math.max(0, scrollWidth - viewportWidth + 300);

    gsap.to(containerRef.current, {
      x: -moveAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: sectionRef, dependencies: [activeCategories] });

  if (activeCategories.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden bg-neutral-50/50">
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-12 w-2 bg-primary rounded-full" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80 font-semibold">Live from Kitchen</p>
            <h2 className="text-4xl font-bold text-secondary">Our Categories</h2>
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={containerRef}
          className="flex gap-8 px-4 whitespace-nowrap will-change-transform"
          style={{ width: "max-content" }}
        >
          {/* Using strictly backend data */}
          {activeCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Utensils;
            return (
              <Link
                key={category.id}
                href={`/browse-meal?categoryId=${category.id}`}
                className="group relative flex flex-col items-center justify-center w-64 h-64 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="p-5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            );
          })}

          {/* Seamless loop duplication using same backend data */}
          {activeCategories.length < 10 && activeCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Utensils;
            return (
              <div
                key={`${category.id}-loop`}
                className="group relative flex flex-col items-center justify-center w-64 h-64 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden opacity-50"
              >
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="p-5 rounded-2xl bg-primary/10 text-primary">
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary">{category.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
