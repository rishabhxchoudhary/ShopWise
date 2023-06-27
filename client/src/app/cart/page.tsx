import CartPage from "@/components/Cart/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCart } from "@/controller/cartController";
import { redirect } from "next/navigation";

interface CartProduct {
  _id: string;
  name: string;
  image: string;
  variant: {
    option: string;
    value: string;
  }[];
  price: number;
  quantity: number;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const cartId = session?.user?.cart;
  const data = await getCart(cartId);
  if (data) {
    const cartdata: CartProduct[] = data.items;
    return (
      <div>
        <CartPage cartdata={cartdata} session={session} />
      </div>
    );
  } else {
    redirect("/login");
  }
}
