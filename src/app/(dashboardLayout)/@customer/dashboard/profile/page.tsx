
import CustomerProfile from "@/components/customerProfile";
import { userService } from "@/services/user.service";

export default async function Page() {
  const { data } = await userService.getSession();
  return <CustomerProfile user={data?.user} />;
}