import { NextResponse } from "next/server";
import connectToDatabase, { product } from "@/database/db";
// import Product from "@/database/models/product";

export async function GET(req: any) {
  const db = await connectToDatabase();
  const products = await product.find(
    {},
    { _id: 1, name: 1, images: 1, category: 1, ratings: 1, price: 1 }
  );
  const data: any = [];
  products.forEach((product: any) => {
    const { _id, name, images, category, ratings, price } = product;
    data.push({
      _id,
      name,
      price,
      image: images[Object.keys(images)[0]],
      category,
      rating: ratings.average,
    });
  });

  return NextResponse.json({ data: data });
}
