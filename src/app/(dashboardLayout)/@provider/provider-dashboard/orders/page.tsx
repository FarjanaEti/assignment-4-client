import { orderService } from '@/services/order.service';
import Link from 'next/link';


export default async function ProviderOrdersPage() {
  const { data: orders, error } =
    await orderService.getProviderOrders();
  console.log(orders)
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

      <div className="overflow-x-auto bg-white rounded-2xl text-black shadow border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}

            {orders?.map((order: any) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {order.id.slice(0, 8)}...
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium">
                  ৳ {order.totalAmount}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/provider-dashboard/orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
};

