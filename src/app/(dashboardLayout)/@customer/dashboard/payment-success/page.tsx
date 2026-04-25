import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-gray-800 border border-white/10 p-8 rounded-3xl shadow-2xl">
        {/* Success Icon with Pulse */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative bg-green-500 p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Payment Received
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your transaction was successful. A confirmation email has been sent to your inbox.
          </p>
        </div>

        {/* Transaction Card */}
        <div className="mt-10 space-y-3">
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">Completed</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="text-gray-200 text-sm font-medium">Oct 24, 2023</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500 text-sm">Total Amount</span>
            <span className="text-white text-lg font-bold">$49.00</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 grid grid-cols-1 gap-4">
          <Link
            href="/dashboard"
            className="w-full bg-white text-black text-center py-4 rounded-2xl font-bold transition-transform active:scale-95 hover:bg-gray-200"
          >
            Back to Dashboard
          </Link>
          <button 
            className="w-full bg-transparent border border-white/10 text-white py-4 rounded-2xl font-semibold hover:bg-white/5 transition-colors"
          >
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
}