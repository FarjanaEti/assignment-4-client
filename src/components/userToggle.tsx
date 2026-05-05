"use client";

import { toggleUserStatusAction } from "@/app/action/toggleUser.action";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default  function UserToggle({ users }: any) {
  const router = useRouter();
  console.log(users)

const toggleStatus = async (id: string) => {
  const res = await toggleUserStatusAction(id);

  if (!res.success) {
    alert(res.message);
    return;
  }

  router.refresh();
};
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="min-w-full text-sm text-card-foreground text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {users?.map((user: any) => (
              <tr
                key={user.id}
                className="hover:bg-muted transition"
              >
                <td className="px-6 py-4 font-medium text-card-foreground">
                  {user.name || "—"}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.role === "ADMIN" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      ADMIN
                    </span>
                  )}

                  {user.role === "CUSTOMER" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      CUSTOMER
                    </span>
                  )}

                  {user.role === "PROVIDER" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      PROVIDER
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {user.status === "ACTIVE"
 ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                      Suspended
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right space-x-4">
                  

                  <button 
                  onClick={() => toggleStatus(user.id)}
                  className="text-destructive hover:text-destructive/80 text-sm font-medium">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}

            {users?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}
