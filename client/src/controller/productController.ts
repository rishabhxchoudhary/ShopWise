import connectToDatabase from "@/database/db";
import Product from "@/models/product";

async function getProductById(id: string) {
  await connectToDatabase();
  const data = await Product.findOne({ _id: id });
  return data;
}

async function getHomeProducts() {
  const data = await Product.find(
    {},
    { _id: 1, name: 1, images: 1, category: 1, ratings: 1, price: 1 }
  );
  return data;
}

export { getProductById, getHomeProducts };
