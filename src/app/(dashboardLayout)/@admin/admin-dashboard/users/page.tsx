export const dynamic = "force-dynamic";
import UserToggle from "@/components/userToggle";
import { allUserService } from "@/services/allUser.service";


const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default async function UsersPage() {
  
  const { data: users, error } = await allUserService.getAllUsers();
  console.log(users,error)
  if (error) {
    return (
      <div className="p-6 text-destructive">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-card-foreground">
          Manage Users
        </h1>
        <span className="text-sm text-muted-foreground">
          Total: {users?.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
      <UserToggle  users={users || []}></UserToggle>
      </div>
    </div>
  );
}
