import {
  UserCircle,
  ShoppingBag,
  Heart,
  Settings,
  LayoutDashboard,
  PlusCircle,
  Users,
  UtensilsCrossed,
  ClipboardList,
  HelpCircle,
  LucideIcon
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: any; // Using any for compatibility with Lucide icons
};

export type RoleNavigation = {
  [key: string]: NavItem[];
};

export const ROLE_NAVIGATION: RoleNavigation = {
  CUSTOMER: [
    { label: "My Profile", href: "/dashboard/profile", icon: UserCircle },
    { label: "My Orders", href: "/dashboard/orders", icon: ClipboardList },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { label: "Cart", href: "/dashboard/cart", icon: ShoppingBag },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  PROVIDER: [
    { label: "Dashboard", href: "/provider-dashboard", icon: LayoutDashboard },
    { label: "Manage Meals", href: "/provider-dashboard/myMenu", icon: UtensilsCrossed },
    { label: "Add Meal", href: "/provider-dashboard/addMenu", icon: PlusCircle },
    { label: "Orders Received", href: "/provider-dashboard/orders", icon: ClipboardList },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Manage Users", href: "/admin-dashboard/users", icon: Users },
    { label: "Manage Meals", href: "/admin-dashboard/category", icon: UtensilsCrossed }, // Category management as requested
    { label: "Manage Orders", href: "/admin-dashboard/orders", icon: ClipboardList },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
};

export const COMMON_NAV_ITEMS = [
  { label: "Help", href: "/help", icon: HelpCircle },
];
