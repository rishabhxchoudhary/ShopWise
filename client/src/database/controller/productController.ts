import { product } from "@/database/db";

async function getProductById(id: string) {
  const data = await product.findOne({ _id: id });
  return data;
}

export { getProductById };
