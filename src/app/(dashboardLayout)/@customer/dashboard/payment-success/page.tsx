import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="text-green-500 text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-500 mb-6">
        Your order has been placed and payment confirmed.
      </p>
      <Link
        href="/dashboard"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}