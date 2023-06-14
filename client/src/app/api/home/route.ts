import { NextResponse } from "next/server";
import { getHomeProducts } from "@/controller/productController";

export async function GET() {
  const products = await getHomeProducts();
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

  const x: { [key: string]: any[] } = data.reduce(
    (result: any, product: any) => {
      if (!result[product.category]) {
        result[product.category] = [];
      }
      result[product.category].push(product);
      return result;
    },
    {} as { [key: string]: any[] }
  );

  return NextResponse.json({ data: x });
}
