
"use client";

import { usePathname } from "next/navigation";
import WhyFoodHub from "@/components/layout/WhyUs";

export default function ConditionalWhyUs() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  if (!isHome) return null;
  return <WhyFoodHub />;
}