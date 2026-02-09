import { Button } from "@/components/ui/button";
import Banner from "./home/banner";
import { authClient } from "@/lib/auth-client";


export default async function Home() {
  const session =await authClient.getSession()
  console.log(session)
  return (
    <div >
      <Banner></Banner>  
       <Button>Click Here</Button>
    </div>
  );
}
