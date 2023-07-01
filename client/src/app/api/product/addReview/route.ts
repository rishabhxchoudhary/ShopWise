import { NextResponse } from "next/server";
import { addReview } from "@/controller/productController";

//username, rating, comment, productId are passed in the body

export async function POST(request: Request) {
    const body = await request.json();
    const { newReviews, productId } = body;
    const data = await addReview(productId, newReviews);
    return NextResponse.json({ data: data });
}
export const dynamic = "force-dynamic";

