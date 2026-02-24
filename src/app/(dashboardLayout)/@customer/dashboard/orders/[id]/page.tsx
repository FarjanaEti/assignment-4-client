import ReviewModal from "@/app/(dashboardLayout)/@provider/provider-dashboard/orders/review";
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
  console.log(id,order)
 
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
 {order.status === "DELIVERED" && (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Meals</h2>

    {order.items.map((item:any) => (
      <div
        key={item.id}
        className="flex items-center justify-between border rounded-lg p-4"
      >
        <div>
          <p className="font-medium">{item.meal.title}</p>
          <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
          </p>
          <p className="text-sm text-gray-500">
            Price: ৳{item.price}
          </p>
        </div>

        {/* REVIEW BUTTON */}
        <ReviewModal mealId={item.mealId} />
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
}
