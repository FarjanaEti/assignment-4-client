import { cartServices } from "@/services/cart.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import RecommendedForYou from "@/components/RecommendedForYou";

const CustomerDashboardHome = async () => {
  // Logged-in customer
  const response = await userService.getSession();
  const user = response.data?.user ?? null;

  // Customer-specific data
  const { data: orders } = await orderService.getMyOrders();
  const { data: cartItems } = await cartServices.getMyCart()

  const lastOrder = orders?.[0];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">

      {/* CUSTOMER HEADER */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-card-foreground">
          Welcome, {user?.name || "Customer"} 
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
        <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-primary/10 text-primary">
          Active Account
        </span>
      </div>

      <RecommendedForYou orders={orders || []} cartItems={cartItems || []} />

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">My Orders</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {orders?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Cart Items</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {cartItems?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Last Order Status</p>
          <h2 className="text-lg font-semibold text-card-foreground mt-3">
            {lastOrder?.status || "No orders yet"}
          </h2>
        </div>

      </div>

      {/* LAST ORDER PREVIEW */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Your Latest Order
        </h3>

        {lastOrder ? (
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="text-card-foreground">
                Order #{lastOrder.id.slice(0, 6)}
              </p>
              <p className="text-muted-foreground">
                {new Date(lastOrder.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-700">
                ৳{lastOrder.total}
              </p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                {lastOrder.status}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            You haven’t placed any orders yet.
          </p>
        )}
      </div>

      {/* EMPTY STATE GUIDANCE */}
      {!orders?.length && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-700">
          Start exploring meals and place your first order 🍽️
        </div>
      )}

    </div>
  );
};

export default CustomerDashboardHome;