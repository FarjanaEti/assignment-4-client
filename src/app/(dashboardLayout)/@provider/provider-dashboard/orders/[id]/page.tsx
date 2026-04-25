import { orderService } from "@/services/order.service";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-orange-100 text-orange-700",
  READY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const paymentStatusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: order, error } = await orderService.getOrderById(id);

  if (error || !order) return notFound();

  const deliveryFee = 40;
  const serviceCharge = 10;
  const subtotal = order.totalAmount;
  const grandTotal = subtotal + deliveryFee + serviceCharge;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-400 font-mono mt-1">{order.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
            {order.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusColors[order.paymentStatus] ?? "bg-gray-100 text-gray-600"}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT: Meal Items */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Ordered Items</h2>
            </div>

            <div className="divide-y divide-gray-50">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex gap-4 p-4">
                  {/* Meal Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {item.meal?.image ? (
                      <Image
                        src={item.meal.image}
                        alt={item.meal.title}
                        width={80}
                        height={80}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Meal Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800">{item.meal?.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.meal?.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-500">
                        ৳{item.price} × {item.quantity}
                      </span>
                      <span className="font-medium text-gray-800">
                        = ৳{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
            <h2 className="font-semibold text-gray-800 mb-4">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Delivery address</p>
                <p className="font-medium text-gray-800 mt-0.5">{order.address}</p>
              </div>
              <div>
                <p className="text-gray-400">Customer email</p>
                <p className="font-medium text-gray-800 mt-0.5">{order.customer?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Restaurant</p>
                <p className="font-medium text-gray-800 mt-0.5">{order.provider?.restaurantName}</p>
              </div>
              <div>
                <p className="text-gray-400">Order date</p>
                <p className="font-medium text-gray-800 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Order time</p>
                <p className="font-medium text-gray-800 mt-0.5">
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Payment method</p>
                <p className="font-medium text-gray-800 mt-0.5">{order.paymentMethod}</p>
              </div>
              {order.transactionId && (
                <div className="col-span-2">
                  <p className="text-gray-400">Transaction ID</p>
                  <p className="font-mono text-xs text-gray-600 mt-0.5">{order.transactionId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Price Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Price Summary</h2>

            <div className="space-y-3 text-sm">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate pr-2">{item.meal?.title} × {item.quantity}</span>
                  <span className="shrink-0">৳{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery fee</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Service charge</span>
                  <span>৳{serviceCharge}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between font-semibold text-base text-gray-800">
                  <span>Total</span>
                  <span>৳{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Order Status</h2>
            <div className="space-y-3">
              {["PENDING", "PLACED", "PREPARING", "READY", "DELIVERED"].map((s, i) => {
                const statuses = ["PENDING", "PLACED", "PREPARING", "READY", "DELIVERED"];
                const currentIndex = statuses.indexOf(order.status);
                const stepIndex = statuses.indexOf(s);
                const isDone = stepIndex <= currentIndex;
                const isCurrent = s === order.status;

                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${
                      isCurrent ? "bg-blue-500 ring-4 ring-blue-100" :
                      isDone ? "bg-green-500" : "bg-gray-200"
                    }`} />
                    <span className={`text-sm ${
                      isCurrent ? "font-semibold text-blue-600" :
                      isDone ? "text-green-600" : "text-gray-400"
                    }`}>
                      {s}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-blue-400 ml-auto">Current</span>
                    )}
                  </div>
                );
              })}

              {order.status === "CANCELLED" && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm font-semibold text-red-600">CANCELLED</span>
                  <span className="text-xs text-red-400 ml-auto">Current</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}