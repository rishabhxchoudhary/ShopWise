import { NextResponse } from "next/server";
import cart from "@/models/cart";

export async function GET() {
  try {
    const data = await cart.create({ items: [] });
    return NextResponse.json({ data: String(data._id) });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
