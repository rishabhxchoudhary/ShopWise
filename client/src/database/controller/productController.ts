import Product from "@/database/models/product";

async function getProductById(id: string) {
  const data = await Product.findOne({ _id: id });
  return data;
}

export { getProductById };
