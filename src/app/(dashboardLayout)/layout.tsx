export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ROLE_NAVIGATION } from "@/constant/navigation"
import NotificationBell from "@/components/NotificationBell";
import NavbarAuth from "@/components/layout/NavbarAuth";
import { redirect } from "next/navigation";
import { userService } from "@/services/user.service";
import { SidebarItem } from "@/components/ui/sidebarItem";

export default async function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode
  customer: React.ReactNode
  provider: React.ReactNode
}) {
  const { data } = await userService.getSession()
  const user = data?.user

  if (!user) {
    redirect("/login");
  }

  const role = user?.role

  let content: React.ReactNode = null
  if (role === "ADMIN") content = admin
  if (role === "CUSTOMER") content = customer
  if (role === "PROVIDER") content = provider

  const navItems = ROLE_NAVIGATION[role?.toUpperCase()] || [];

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-background hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="bg-primary text-white p-1 rounded-lg">FH</span>
            FoodHub
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem label="Home" href="/" />
          <div className="pt-4 pb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Navigation
          </div>
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={<item.icon size={18} />}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="bg-muted/50 rounded-2xl p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Logged in as</p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {user.name?.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-xl tracking-tight uppercase">
              {role?.toLowerCase()} <span className="text-primary">Panel</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {role === "CUSTOMER" && <NotificationBell />}
            <NavbarAuth user={user} />
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {content}
          </div>
        </main>
      </div>
    </div>
  )
}
