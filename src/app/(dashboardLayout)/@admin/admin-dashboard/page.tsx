// app/admin/dashboard/page.tsx
"use client";

import { 
  Users, 
  ShoppingBag, 
  Package, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  UserCheck,
  UserX
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";


export default  function AdminDashboardHome() {
//   const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/provider`, {
//   cache: "no-store",
// });

//const providers = await res.json();
// console.log(providers)
  // In real app these would come from API / server components
  const stats = {
    totalUsers: 1248,
    newUsersToday: 42,
    activeOrders: 187,
    pendingOrders: 34,
    suspendedUsers: 19,
    totalRevenue: "৳458,920",
  };

  return (
    <div className="container mx-auto space-y-8 py-6 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview • Manage users, orders, categories & platform content
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          description="+42 today"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          color="blue"
        />
        
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          description={`${stats.pendingOrders} pending`}
          icon={<ShoppingBag className="h-5 w-5" />}
          trend="neutral"
          color="amber"
        />
        
        <StatCard
          title="Platform Revenue"
          value={stats.totalRevenue}
          description="This month"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          color="emerald"
        />
        
        <StatCard
          title="Suspended Accounts"
          value={stats.suspendedUsers}
          description="Requires attention"
          icon={<ShieldAlert className="h-5 w-5" />}
          trend="warning"
          color="rose"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Content - Left side (larger) */}
        <div className="md:col-span-5 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Last 10 actions on the platform</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 min ago", action: "New order #3942", user: "Rahim Khan", status: "Processing" },
                  { time: "14 min ago", action: "User suspended", user: "fakeuser123", reason: "Spam reports" },
                  { time: "37 min ago", action: "Category added", user: "Admin", name: "Desserts → Premium" },
                  { time: "1 hr ago", action: "Order completed", user: "Ayesha Akter", orderId: "#3941" },
                  { time: "2 hrs ago", action: "User registered", user: "newprovider22" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between text-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-muted-foreground">{item.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      {item.status && (
                        <div  className="mt-1 text-xs">
                          {item.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <QuickActionCard
              title="Manage Users"
              description="View, suspend, activate customers & providers"
              icon={<Users className="h-6 w-6" />}
              href="/admin/users"
              color="indigo"
            />
            
            <QuickActionCard
              title="Orders Overview"
              description="Track, update & manage all customer orders"
              icon={<ShoppingBag className="h-6 w-6" />}
              href="/admin/orders"
              color="violet"
            />
            
            <QuickActionCard
              title="Categories & Menu"
              description="Add, edit and organize service categories"
              icon={<Package className="h-6 w-6" />}
              href="/admin/categories"
              color="cyan"
            />
            
            <QuickActionCard
              title="Moderation Queue"
              description="Review reported content & users"
              icon={<ShieldAlert className="h-6 w-6" />}
              href="/admin/moderation"
              color="rose"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Providers</span>
                  <span className="font-medium">284</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[68%]" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Verifications</span>
                  <div>17</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Reports Today</span>
                  <div>8</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Attention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <UserX className="h-5 w-5 text-rose-500" />
                <div>
                  <p>19 suspended users</p>
                  <p className="text-xs text-muted-foreground">Last action 41 min ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <p>34 orders waiting  2 hours</p>
                  <p className="text-xs text-muted-foreground">Most urgent: 6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Reusable Components
// ────────────────────────────────────────────────

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral" | "warning";
  color: string;
};

function StatCard({ title, value, description, icon, trend, color }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`opacity-70 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
          {trend === "warning" && <ShieldAlert className="h-3 w-3 text-rose-500" />}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
};

function QuickActionCard({ title, description, icon, href, color }: QuickActionCardProps) {
  const bgColors = {
    indigo: "from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20",
    violet: "from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/20",
    cyan: "from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20",
    rose: "from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20",
  };

  const textColors = {
    indigo: "text-indigo-700 dark:text-indigo-300",
    violet: "text-violet-700 dark:text-violet-300",
    cyan: "text-cyan-700 dark:text-cyan-300",
    rose: "text-rose-700 dark:text-rose-300",
  };

  return (
    <Card className={`hover:shadow-md transition-all duration-200 bg-linear-to-br ${bgColors[color as keyof typeof bgColors]}`}>
      <CardContent className="p-6">
        <div className={`rounded-lg p-3 inline-block mb-4 ${textColors[color as keyof typeof textColors]} bg-white/60 dark:bg-black/30`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="link" className="px-0 mt-4 h-auto" asChild>
          <a href={href}>
            Go to section →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}