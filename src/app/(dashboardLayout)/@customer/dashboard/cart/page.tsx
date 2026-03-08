import Image from "next/image";
import { cartServices } from "@/services/cart.service";
import { removeCartItemAction } from "@/app/action/removecart.action";
import { placeOrderAction } from "@/app/action/orderPlace.action";

export default async function CustomerOrdersPage() {
  const { data: carts, error } = await cartServices.getMyCart()
  console.log(carts)
  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load cart
      </div>
    );
  }

  if (!carts || carts.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">🛒 Your cart is empty</h2>
        <p className="text-gray-500 mt-2">
          Add meals to place an order
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        My Cart
      </h1>

      {carts.map((cart:any) => {
        const subtotal = cart.items.reduce(
          (sum:any, item:any) => sum + Number(item.subtotal),
          0
        );

        const deliveryFee = 40;
        const serviceCharge = 10;
        const total = subtotal + deliveryFee + serviceCharge;

        return (
          <div
            key={cart.id}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* LEFT: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item:any) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border rounded-lg"
                >
                  <Image
                    src={item.meal.image || "/placeholder.png"}
                    alt={item.meal.title}
                      unoptimized
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-gray-800">
                      {item.meal.title}
                    </h3>

                    <p className="text-sm font-bold text-gray-500">
                      ৳{item.meal.price} × {item.quantity}
                    </p>

                    <p className="mt-1 font-medium">
                      Subtotal: ৳{item.subtotal}
                    </p>

                    {/* Quantity + Remove (client actions later) */}
                    <div className="mt-3 flex items-center gap-4">
                      <button className="px-2 py-1 border rounded">
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button className="px-2 py-1 border rounded">
                        +
                      </button>

   <form action={removeCartItemAction}>
  <input
    type="hidden"
    name="cartItemId"
    value={item.id}
  />

  <button
    type="submit"
    className="text-sm text-red-500 hover:underline"
  >
    Remove
  </button>
</form>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="border rounded-lg p-5 h-fit sticky top-24">
  <h2 className="text-lg font-semibold mb-1">
    Order Summary
  </h2>


  {/* Ordered Items */}
  <div className="space-y-3 mb-4">
    {cart.items.map((item: any) => (
      <div
        key={item.id}
        className="flex justify-between text-sm"
      >
        <div>
          <p className="font-medium text-gray-800">
            {item.meal.title}
          </p>
          <p className="text-xs text-gray-500">
            Qty: {item.quantity}
          </p>
        </div>

        <span className="font-medium">
          ৳{item.subtotal}
        </span>
      </div>
    ))}
  </div>

  <hr className="my-3" />

  {/* Price Breakdown */}
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>৳{subtotal}</span>
    </div>

    <div className="flex justify-between">
      <span>Delivery Fee</span>
      <span>৳{deliveryFee}</span>
    </div>

    <div className="flex justify-between">
      <span>Service Charge</span>
      <span>৳{serviceCharge}</span>
    </div>

    <hr />

    <div className="flex justify-between font-semibold text-base">
      <span>Total</span>
      <span>৳{total}</span>
    </div>
  </div>

  <form action={placeOrderAction} className="mt-6 space-y-4">
  <input
    type="hidden"
    name="providerId"
    value={cart.providerId}
  />

  <input
    type="hidden"
    name="items"
    value={JSON.stringify(
      cart.items.map((item: any) => ({
        mealId: item.mealId,
        quantity: item.quantity,
      }))
    )}
  />

  <textarea
    name="address"
    required
    placeholder="Enter delivery address"
    className="w-full border rounded-lg p-3 text-sm"
  />

  <button
    type="submit"
    className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
  >
    Place Order (Cash on Delivery)
  </button>
</form>
</div>
          </div>
        );
      })}
    </div>
  );
}