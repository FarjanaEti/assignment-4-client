"use client"
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { UtensilsCrossed, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import NavbarAuth from "./NavbarAuth";
import { ModeToggle } from "./MoodToggle";
import { useSession } from "@/hooks/userSession";



// export default async function Navbar({ className }: { className?: string }) {
  export default function Navbar() {
//   const response = await userService.getSession();
// const user = response?.data?.user || null;
// const session = response?.data?.session || null;

 const { data, loading } = useSession();
  const user = data?.user;


    let dashboardUrl = "/dashboard";

  if (user?.role === "PROVIDER") {
    dashboardUrl = "/provider-dashboard";
  } else if (user?.role === "ADMIN") {
    dashboardUrl = "/admin-dashboard";
  }

  const menu = [
    { title: "Home", url: "/" },
    { title: "About Us", url: "/about" },
    { title: "All Meals", url: "/browse-meal" },
    { title: "Restaurants", url: "/restaurants" },
  ];
  if (user) {
 menu.push({ title: "Dashboard", url: dashboardUrl });
}

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto relative h-16">
        {/* Logo */}
        <Link
          href="/"
          className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-2"
        >
          <UtensilsCrossed className="h-6 w-6 text-secondary" />
          <span className="text-lg text-secondary font-bold">FoodHub</span>
        </Link>

        {/* Menu */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="text-sm font-medium text-secondary hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:flex items-center gap-4">
          <ModeToggle />
          <NavbarAuth user={user} />
        </div>

        {/* Mobile */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>FoodHub</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {menu.map((item) => (
                  <Link key={item.title} href={item.url}>
                    {item.title}
                  </Link>
                ))}

                <NavbarAuth user={user} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
