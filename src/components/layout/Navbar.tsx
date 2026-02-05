"use client";

import Link from "next/link";
import { Menu, UtensilsCrossed } from "lucide-react";

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
import { ModeToggle } from "./MoodToggle";

const menu = [
  { title: "Home", url: "/" },
  { title: "Browse Meals", url: "/browsMeal" },
  { title: "Restaurants", url: "/restaurants" },
  { title: "Dashboard", url: "/dashboard" },
];

const Navbar = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white shadow-sm",
        className
      )}
    >
      <div className="container mx-auto  relative h-16">
        {/* LEFT — Logo */}
        <Link
          href="/"
          className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-2"
        >
          <UtensilsCrossed className="h-6 w-6 text-black" />
          <span className="text-lg font-bold text-black">FoodHub</span>
        </Link>

        {/* CENTER — Menu */}
        <nav className="absolute left-1/2 top-1/2 hidden  -translate-x-1/2 -translate-y-1/2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="text-sm font-medium text-slate-950 transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* RIGHT — Auth */}
        <div className="absolute text-orange-500 right-6 top-1/2 hidden -translate-y-1/2 lg:flex gap-3">
           <ModeToggle></ModeToggle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* MOBILE MENU */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                    <span className="font-bold text-primary">FoodHub</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <ModeToggle></ModeToggle>
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
