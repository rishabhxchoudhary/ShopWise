import { getCart } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const cartId = session.user.cart;
    console.log(cartId);
    const data = await getCart(cartId);
    const cartData = data?.items;
    console.log(cartData);
    return NextResponse.json({ data: cartData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: [error] });
  }
}
