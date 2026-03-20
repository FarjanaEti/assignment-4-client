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
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users?.map((user: any) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name || "—"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.role === "ADMIN" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      ADMIN
                    </span>
                  )}

                  {user.role === "CUSTOMER" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      CUSTOMER
                    </span>
                  )}

                  {user.role === "PROVIDER" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      PROVIDER
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {user.status === "ACTIVE"
 ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Suspended
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right space-x-4">
                  

                  <button 
                  onClick={() => toggleStatus(user.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}

            {users?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500"
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
