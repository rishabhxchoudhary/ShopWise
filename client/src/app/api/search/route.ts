import { NextResponse } from "next/server";
import { getProductsBySearchString } from "@/controller/productController";

export async function POST(request: Request) {
  const body = await request.json();
  const { query } = body;
  const data = await getProductsBySearchString(query);
  return NextResponse.json({ data: data });
}
export const dynamic = "force-dynamic";
