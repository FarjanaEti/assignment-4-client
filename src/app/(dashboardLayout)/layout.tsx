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
import { userService } from "@/services/user.service"
import { SidebarItem } from "@/components/ui/sidebarItem"
import NotificationBell from "@/components/NotificationBell";

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
  const user = data.user
  const role = user.role

  let content: React.ReactNode = null
  if (role === "ADMIN") content = admin
  if (role === "CUSTOMER") content = customer
  if (role === "PROVIDER") content = provider

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-6">FoodHub</h2>

        <nav className="space-y-1">
          <SidebarItem label="Home" href="/" />

          {role === "CUSTOMER" && (
            <>
              <SidebarItem label="My Orders" href="/dashboard/orders" />
              <SidebarItem label="Cart" href="/dashboard/cart" />
              <SidebarItem label="My Profile" href="/dashboard/profile" />
            </>
          )}

          {role === "PROVIDER" && (
            <>
              <SidebarItem label="Add-Menu" href="/provider-dashboard/addMenu" />
              <SidebarItem label="Orders" href="/provider-dashboard/orders" />
              <SidebarItem label="My Menu" href="/provider-dashboard/myMenu" />
            </>
          )}

          {role === "ADMIN" && (
            <>
              <SidebarItem label="Users" href="/admin-dashboard/users" />
              <SidebarItem label="Providers" href="/admin-dashboard/providers" />
              <SidebarItem label="Orders" href="/admin-dashboard/orders" />
              <SidebarItem label="Payment" href="/admin-dashboard/payment" />
              <SidebarItem label="Category" href="/admin-dashboard/category" />
            </>
          )}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Logout
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <div className="px-3 py-2 text-sm font-medium">
                  {user.name}
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Separator />

        <main className="flex-1 p-6">
          {content}
        </main>
      </div>
      {/* Order Notifier — only for customers */}
    {role === "CUSTOMER" && <NotificationBell />}

    </div>
  )
}