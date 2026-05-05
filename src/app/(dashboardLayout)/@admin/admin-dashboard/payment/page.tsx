import { orderService } from "@/services/order.service";

export default async function PaymentHistoryPage() {
  const { data: orders, error } = await orderService.getAllOrders();

  if (error) return <div className="p-6 text-destructive">Failed to load orders</div>;

  const total = orders?.reduce((s: number, o: any) => s + Number(o.totalAmount), 0) ?? 0;
  const paid = orders?.filter((o: any) => o.paymentStatus === "PAID") ?? [];
  const pending = orders?.filter((o: any) => o.paymentStatus === "PENDING") ?? [];
  const failed = orders?.filter((o: any) => o.paymentStatus === "FAILED") ?? [];

  const badge: Record<string, string> = {
    PAID: "bg-accent/10 text-accent",
    PENDING: "bg-primary/10 text-primary",
    FAILED: "bg-destructive/10 text-destructive",
    ONLINE: "bg-primary/10 text-primary",
    COD: "bg-muted text-muted-foreground",
    PLACED: "bg-accent/10 text-accent",
    CANCELLED: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-card-foreground">Payment history</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total orders", value: orders?.length ?? 0 },
          { label: "Total revenue", value: `৳${total.toLocaleString()}` },
          { label: "Paid", value: paid.length },
          { label: "Pending", value: pending.length },
          { label: "Failed", value: failed.length },
        ].map((s) => (
          <div key={s.label} className="bg-muted rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-card-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm text-card-foreground">
          <thead className="bg-muted border-b">
            <tr>
              {["Order ID", "Date", "Method", "Payment", "Order", "Amount", "Transaction ID"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((o: any) => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-muted">
                <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                <td className="px-4 py-3">{new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.paymentMethod]}`}>{o.paymentMethod}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.paymentStatus]}`}>{o.paymentStatus}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-md font-medium ${badge[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3 font-medium">৳{Number(o.totalAmount).toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.transactionId ? o.transactionId.slice(0, 8) + "…" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}