import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="text-red-500 text-6xl mb-4">❌</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Payment Failed
      </h1>
      <p className="text-gray-500 mb-6">
        Something went wrong. Your order has been cancelled.
      </p>
      <Link
        href="/dashboard/cart"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Back to Cart
      </Link>
    </div>
  );
}