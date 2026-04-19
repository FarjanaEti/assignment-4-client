import { orderService } from "@/services/order.service";

export default async function PaymentHistoryPage() {
  const { data: orders, error } = await orderService.getAllOrders();

  if (error) return <div className="p-6 text-red-500">Failed to load orders</div>;

  const total = orders?.reduce((s: number, o: any) => s + Number(o.totalAmount), 0) ?? 0;
  const paid = orders?.filter((o: any) => o.paymentStatus === "PAID") ?? [];
  const pending = orders?.filter((o: any) => o.paymentStatus === "PENDING") ?? [];
  const failed = orders?.filter((o: any) => o.paymentStatus === "FAILED") ?? [];

  const badge: Record<string, string> = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
    ONLINE: "bg-blue-100 text-blue-700",
    COD: "bg-gray-100 text-gray-600",
    PLACED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Payment history</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total orders", value: orders?.length ?? 0 },
          { label: "Total revenue", value: `৳${total.toLocaleString()}` },
          { label: "Paid", value: paid.length },
          { label: "Pending", value: pending.length },
          { label: "Failed", value: failed.length },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-medium">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {["Order ID", "Date", "Method", "Payment", "Order", "Amount", "Transaction ID"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((o: any) => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                <td className="px-4 py-3">{new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.paymentMethod]}`}>{o.paymentMethod}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.paymentStatus]}`}>{o.paymentStatus}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3 font-medium">৳{Number(o.totalAmount).toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.transactionId ? o.transactionId.slice(0, 8) + "…" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}