
import { getCart, mergeCarts } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const oldCartId = session.user.cart;
    const oldCart = await getCart(oldCartId);
    const {newCart} = await req.json();
    await mergeCarts(oldCart, newCart);
    return NextResponse.json({ data: newCart });
}

export const dynamic = "force-dynamic";