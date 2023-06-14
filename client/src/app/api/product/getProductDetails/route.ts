import { NextResponse } from "next/server";
import { getProductById } from "@/controller/productController";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;
  const data = await getProductById(id);
  return NextResponse.json({ data: data });
}
