import connectToDatabase from "@/database/db";
import Cart from "@/models/cart";

async function getCart(id: string) {
  await connectToDatabase();
  const data = await Cart.findOne({ _id: id });
  return data;
}

async function updateCart(id: String, items: any) {
  await connectToDatabase();
  const data = await Cart.updateOne({ _id: id }, { items: items });
  return data;
}

export { getCart, updateCart };
