
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"



export default function DashboardLayout({
 customer,
  admin
}: {
  children: React.ReactNode;
  admin:React.ReactNode;
  customer:React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
     
      <aside className="w-64 border-r bg-background p-4  md:block">
       <h2 className="text-lg   font-semibold mb-4">
  FoodHub
</h2>


        <nav className="space-y-1 bg-amber-200">
          {["Dashboard", "Orders", "Menu", "Revenue"].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start"
            >
              {item}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b  bg-background flex items-center justify-between px-6">
          <h1 className="font-semibold bg-red-500! text-white!">Dashboard</h1>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>Menu</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <Separator />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {admin}
          {customer}
        </main>
      </div>
    </div>
  )
}
