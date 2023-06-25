import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { randomUUID } from "crypto";
import Cart from "@/models/cart";

export async function GET() {
  try {
    console.log("Inside GET");
    const session = await getServerSession(authOptions);
    console.log(session);
    if (session == null || undefined) {
      // Create a cart.
      const cart = await Cart.create({ items: [] });
      const session = {
        id: randomUUID(),
        user: {
          name: "Guest User",
          email: "guest@example.com",
          cart: String(cart._id),
        },
        expiresAt: new Date(Date.now() + 60 * 1000), // Expires in 1 minute
      };
      console.log(session);
      return NextResponse.json(session);
      //   Set session in Next Auth session
      // Code here
    }
    return NextResponse.json(session);
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
