import Orders  from "@/components/Orders/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getOrdersByUser } from "@/controller/orderController";

export default async function OrdersPage() {
  // Get all orders of the user
  const session = await getServerSession(authOptions);
  const orders: any[]  = await getOrdersByUser(session.user.email);
  console.log(orders);
  return (
      <div>
        <Orders orders={orders} />
      </div>
  )
}
