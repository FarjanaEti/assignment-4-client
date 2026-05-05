import { allUserService } from "@/services/allUser.service";
import { categoryService } from "@/services/category.service";
import { orderService } from "@/services/order.service";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";
const AdminDashboardHome = async () => {
  // Admin session
  const response = await userService.getSession();
  const user = response.data?.user ?? null;

  // System data
  const { data: categories } = await categoryService.getAllCategories();
  const { data: providers } = await providerService.getAllProviders();
  const { data: users } = await allUserService.getAllUsers();
  const { data: orders } = await orderService.getAllOrders();

  return (
    <div className="min-h-screen  p-6 space-y-8">

      {/* ADMIN PROFILE SECTION */}
      <div className="bg-card rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">
            Welcome back, {user?.name || "Admin"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Role: <span className="font-medium">Administrator</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Email: {user?.email || "N/A"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Account Status</p>
          <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm bg-accent/10 text-accent">
            Active
          </span>
        </div>
      </div>

      {/* SYSTEM KPI SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {users?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Categories</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Providers</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {providers?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {orders?.length || 0}
          </h2>
        </div>

      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECENT USERS */}
        <div className="bg-card rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Recently Registered Users
          </h3>

          <ul className="space-y-3">
            {users?.slice(0, 5).map((u:any) => (
              <li
                key={u.id}
                className="flex justify-between text-sm border-b pb-2 last:border-b-0"
              >
                <span className="text-card-foreground">{u.name}</span>
                <span className="text-muted-foreground">{u.email}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-card rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Recent Orders
          </h3>

          <ul className="space-y-3">
            {orders?.slice(0, 5).map((order:any) => (
              <li
                key={order.id}
                className="flex justify-between text-sm border-b pb-2 last:border-b-0"
              >
                <span className="text-card-foreground">
                  Order #{order.id.slice(0, 6)}
                </span>
                <span className="text-gray-500">
                  ৳{order.total}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardHome;