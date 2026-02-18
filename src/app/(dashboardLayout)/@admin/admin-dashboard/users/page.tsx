import UserToggle from "@/components/userToggle";
import { allUserService } from "@/services/allUser.service";


const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default async function UsersPage() {
  
  const { data: users, error } = await allUserService.getAllUsers();
  console.log(users,error)
  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Users
        </h1>
        <span className="text-sm text-gray-500">
          Total: {users?.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <UserToggle  users={users || []}></UserToggle>
      </div>
    </div>
  );
}
