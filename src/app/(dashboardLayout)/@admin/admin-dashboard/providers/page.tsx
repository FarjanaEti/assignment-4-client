export const dynamic = "force-dynamic";
import { deleteProviderAction } from "@/app/action/provider.action";
import { providerService } from "@/services/provider.service";
import Link from "next/link";

export default async function ProvidersPage() {
  const { data, error } = await providerService.getAllProviders(
    { page: "1", limit: "10" },
    { cache: "no-store" }
  );

  if (error) {
    return (
      <div className="p-6 text-destructive font-medium">
        Failed to load providers.
      </div>
    );
  }

  const providers = data?.data || [];
 
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-card-foreground">
          All Providers
        </h1>
        <span className="text-sm text-muted-foreground">
          Total: {data?.pagination?.total}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="min-w-full text-sm text-card-foreground text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Meals</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {providers.map((provider: any) => (
              <tr
                key={provider.id}
                className="hover:bg-muted transition"
              >
                <td className="px-6 py-4 font-medium text-card-foreground">
                  {provider.restaurantName}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {provider.address}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {provider.phone}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {provider._count?.meals ?? 0}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {provider._count?.orders ?? 0}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
               href={`/admin-dashboard/providers/${provider.id}`}
                className="text-primary hover:text-primary/80 font-medium text-sm mr-4">
                  View
                   </Link>
                 <form action={deleteProviderAction} className="inline">
                   <input type="hidden" name="providerId" value={provider.id} />
                       <button
                type="submit"
             className="text-destructive hover:text-destructive/80 font-medium text-sm"
                  >
             Delete
           </button>
           </form>


                </td>
              </tr>
            ))}

            {providers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
