import { getCart, updateCart } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { productid, quantity } = body;
    const session = await getServerSession(authOptions);
    const cartId = session.user.cart;
    const data = await getCart(cartId);
    const cartData = data?.items;
    const updatedCart = cartData?.map((p) => {
      if (p._id === productid) {
        p.quantity = quantity;
        return p;
      }
      return p;
    });
    await updateCart(cartId, updatedCart);
    return NextResponse.json({ data: updatedCart });
  } catch (error) {
    return NextResponse.json({ data: [] });
  }
}

export const dynamic = "force-dynamic";
