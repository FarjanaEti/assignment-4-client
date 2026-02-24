import { updateOrderStatusAction } from "@/app/action/updateOrder.action";
import { orderService } from "@/services/order.service";
import Link from "next/link";
// import { updateOrderStatusAction } from "@/app/action/updateOrderStatus.action";

const STATUS_FLOW = {
  PLACED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export default async function ProviderOrdersPage() {
  const { data: orders, error } =
    await orderService.getProviderOrders();

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-yellow-800">
        My Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 text-center py-4">Details</th>
              <th className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}

            {orders?.map((order: any) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium">
                  {order.id.slice(0, 8)}…
                </td>

                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium">
                  ৳ {order.totalAmount}
                </td>

                 <td className="px-6 py-4 text-center">
                  <Link
                    href={`/provider-dashboard/orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  {STATUS_FLOW[order.status as keyof typeof STATUS_FLOW]
                    .map((nextStatus) => (
                      <form
                        key={nextStatus}
                        action={updateOrderStatusAction}
                        className="inline"
                      >
                        <input
                          type="hidden"
                          name="orderId"
                          value={order.id}
                        />
                        <input
                          type="hidden"
                          name="status"
                          value={nextStatus}
                        />
                        <button
                          type="submit"
                          className="px-3 py-1 text-xs font-bold 
                           rounded-3xl bg-blue-400 text-white 
                           hover:opacity-80"
                        >
                          Mark {nextStatus}
                        </button>
                      </form>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}