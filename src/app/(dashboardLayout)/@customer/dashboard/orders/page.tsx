import Link from "next/link";
import { orderService } from "@/services/order.service";

export default async function CustomerOrdersPage() {
  const { data: orders, error } = await orderService.getMyOrders();

  if (error) {
    return <div className="p-6 text-red-500">Failed to load orders</div>;
  }

  const orderStatusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PLACED: "bg-blue-100 text-blue-700",
    PREPARING: "bg-orange-100 text-orange-700",
    READY: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const paymentStatusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
  };

  // Stats calculation
  const totalSpent = orders
    ?.filter((o: any) => o.paymentStatus === "PAID")
    .reduce((sum: number, o: any) => sum + Number(o.totalAmount), 0) ?? 0;

  const totalOrders = orders?.length ?? 0;
  const deliveredOrders = orders?.filter((o: any) => o.status === "DELIVERED").length ?? 0;
  const pendingOrders = orders?.filter((o: any) => !["DELIVERED", "CANCELLED"].includes(o.status)).length ?? 0;
  const cancelledOrders = orders?.filter((o: any) => o.status === "CANCELLED").length ?? 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-card-foreground">My Orders</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Total spent</p>
          <p className="text-2xl font-semibold text-accent">৳{totalSpent.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">On paid orders</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Total orders</p>
          <p className="text-2xl font-semibold text-card-foreground">{totalOrders}</p>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Delivered</p>
          <p className="text-2xl font-semibold text-primary">{deliveredOrders}</p>
          <p className="text-xs text-muted-foreground mt-1">Successfully received</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Active orders</p>
          <p className="text-2xl font-semibold text-primary">{pendingOrders}</p>
          <p className="text-xs text-muted-foreground mt-1">In progress</p>
        </div>
      </div>

      {/* Active Orders Banner — only if any active */}
      {pendingOrders > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-primary text-lg">🕐</span>
          <p className="text-sm text-green-600 font-medium">
            You have {pendingOrders} active order{pendingOrders > 1 ? "s" : ""} in progress
          </p>
        </div>
      )}

      {/* Failed Payment Warning */}
      {orders?.some((o: any) => o.paymentStatus === "FAILED") && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-red-500 text-lg">⚠️</span>
          <p className="text-sm text-red-700 font-medium">
            Some orders have failed payments. Please place a new order to retry.
          </p>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto bg-card rounded-2xl shadow border border-border">
        <table className="min-w-full text-sm text-card-foreground text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Order Status</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {totalOrders === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                  <p className="text-lg mb-1">🛒 No orders yet</p>
                  <p className="text-xs text-muted-foreground">Your orders will appear here once you place one</p>
                </td>
              </tr>
            )}

            {orders?.map((order: any) => (
              <tr key={order.id} className="hover:bg-muted transition">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                  {order.id.slice(0, 8)}...
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${orderStatusColor[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentMethod === "COD"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.paymentMethod}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusColor[order.paymentStatus] ?? "bg-gray-100 text-gray-600"}`}>
                    {order.paymentStatus}
                  </span>
                  {order.paymentStatus === "FAILED" && (
                    <p className="text-xs text-red-500 mt-1">Place a new order to retry</p>
                  )}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  ৳{Number(order.totalAmount).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Footer Summary */}
        {totalOrders > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>{totalOrders} order{totalOrders > 1 ? "s" : ""} total · {cancelledOrders} cancelled</span>
            <span className="font-medium text-gray-700">
              Total paid: ৳{totalSpent.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}