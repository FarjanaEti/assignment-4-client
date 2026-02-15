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

import { userService } from "@/services/user.service";
import NavbarAuth from "./NavbarAuth";
import { ModeToggle } from "./MoodToggle";

const menu = [
  { title: "Home", url: "/" },
  { title: "Browse Meals", url: "/browsMeal" },
  { title: "Restaurants", url: "/restaurants" },
  { title: "Dashboard", url: "/dashboard" },
];

export default async function Navbar({ className }: { className?: string }) {
  const response = await userService.getSession();
   const user = response.data?.user ?? null;
   const session = response.data?.session ?? null;


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white shadow-sm",
        className
      )}
    >
      <div className="container mx-auto relative h-16">
        {/* Logo */}
        <Link
          href="/"
          className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-2"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span className="text-lg font-bold">FoodHub</span>
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
                      className="text-sm font-medium hover:text-primary"
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
