import Orders  from "@/components/Orders/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getOrdersByUser } from "@/controller/orderController";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.email){
    const orders: any[]  = await getOrdersByUser(session.user.email);
    return (
        <div>
          <Orders orders={orders} />
        </div>
    )
  }
  else{
    // redirect("/login"); 
    return (
      <div>
        <h1 className="py-5">Not logged in</h1>
      </div>
    )
  }
}
