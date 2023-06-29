import { getCart, updateCart } from "@/controller/cartController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const isEqual = (
  arr1: { option: string; value: string }[],
  arr2: { option: string; value: string }[]
): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].option !== arr2[i].option || arr1[i].value !== arr2[i].value) {
      return false;
    }
  }
  return true;
};

export async function POST(req: Request) {
  const body = await req.json();
  const { product, uuid } = body;
  let cart;
  if (uuid) {
    cart = String(uuid);
  } else {
    const session = await getServerSession(authOptions);
    cart = session.user.cart;
  }
  const cur_product = product;
  const data = await getCart(cart);
  const cartData = data?.items;

  const existingItemIndex = cartData?.findIndex(
    (item) =>
      item._id === cur_product?._id &&
      isEqual(item.variant, cur_product.variant)
  );

  if (existingItemIndex && existingItemIndex !== -1) {
    if (cartData) cartData[existingItemIndex].quantity += cur_product.quantity;
  } else {
    cartData?.push(cur_product);
  }

  // Update the items
  await updateCart(cart, cartData);
  NextResponse.json({ data: "added" });
}

export const dynamic = "force-dynamic";
