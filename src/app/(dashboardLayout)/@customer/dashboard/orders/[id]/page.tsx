import { orderService } from "@/services/order.service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params; 

  const { data: order, error } =
    await orderService.getOrderById(id);

  if (error || !order) {
    return notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Order Details
      </h1>

      <div className="bg-white rounded-2xl shadow border p-6 space-y-4">
        <div className="flex justify-between">
          <p>
            <span className="font-medium">Order ID:</span> {order.id}
          </p>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {order.status}
          </span>
        </div>

        <p>
          <span className="font-medium">Total:</span> ৳ {order.totalAmount}
        </p>

        <p>
          <span className="font-medium">Address:</span> {order.address}
        </p>

        <p>
          <span className="font-medium">Restaurant:</span>{" "}
          {order.provider.restaurantName}
        </p>

        <p>
          <span className="font-medium">Email:</span>{" "}
          {order.customer.email}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
