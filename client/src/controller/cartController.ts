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

async function mergeCarts(oldCart: any, newCart: any) {
  await connectToDatabase();
  const data = await Cart.updateOne(
    { _id: oldCart._id },
    { items: [...oldCart.items, ...newCart.items] }
  );
  return data;
}

export { getCart, updateCart, mergeCarts };
