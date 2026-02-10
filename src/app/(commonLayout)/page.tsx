import { Button } from "@/components/ui/button";
import Banner from "./home/banner";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";


export default async function Home() {
  const {data} =await userService.getSession()
  console.log(data)
  return (
    <div >
      <Banner></Banner>  
       <Button>Click Here</Button>
    </div>
  );
}
