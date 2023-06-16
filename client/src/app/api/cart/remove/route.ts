import { getCart, updateCart } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productid } = body;
    const session = await getServerSession(authOptions);
    const cartId = session.user.cart;
    const data = await getCart(cartId);
    const cartData = data?.items;
    const updatedCart = cartData?.filter((p) => p._id !== productid);
    await updateCart(cartId, updatedCart);
    return NextResponse.json({ data: updatedCart });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: [] });
  }
}

export const dynamic = "force-dynamic";
