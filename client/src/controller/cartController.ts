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

async function mergeCarts(oldCart: any, newCart: any) {
  await connectToDatabase();
  const oldCartItems = oldCart.items;
  const newCartItems = newCart;

  // Merge the two carts
  for (let i = 0; i < newCartItems.length; i++) {
    const existingItemIndex = oldCartItems?.findIndex(
      (item: any) =>
        item._id === newCartItems[i]?._id &&
        isEqual(item.variant, newCartItems[i].variant)
    );
    if (existingItemIndex && existingItemIndex !== -1) {
      // Item with the same variant already exists, increase the quantity
      if (oldCartItems)
        oldCartItems[existingItemIndex].quantity += newCartItems[i].quantity;
    } else {
      // Item with the same variant doesn't exist, add the new product to the cart
      oldCartItems?.push(newCartItems[i]);
    }
  }

  const data = await Cart.updateOne(
    { _id: oldCart._id },
    { items: oldCartItems }
  );
  return oldCart;
}

export { getCart, updateCart, mergeCarts };
