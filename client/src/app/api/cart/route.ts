import { getCart } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uuid } = body;
    let cartId;
    if (uuid) {
      cartId = String(uuid);
    } else {
      const session = await getServerSession(authOptions);
      cartId = session.user.cart;
    }
    const data = await getCart(cartId);
    const cartData = data?.items;
    return NextResponse.json({ data: cartData });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
