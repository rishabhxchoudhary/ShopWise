import connectToDatabase from "@/database/db";
import Product from "@/models/product";

async function getProductById(id: string) {
  await connectToDatabase();
  const data = await Product.findOne({ _id: id });
  return data;
}

async function getHomeProducts() {
  await connectToDatabase();
  const data = await Product.find(
    {},
    { _id: 1, name: 1, images: 1, category: 1, ratings: 1, price: 1 }
  );
  return data;
}


async function getProductsBySearchString(searchString: string) {
  await connectToDatabase();
  const data = await Product.find(
    { $or: [
      { name: { $regex: searchString, $options: "i" } },
      { description: { $regex: searchString, $options: "i" } },
      { category: { $regex: searchString, $options: "i" } },
      { brand: { $regex: searchString, $options: "i" } },
      { tags: { $regex: searchString, $options: "i" } },
      { metaDescription: { $regex: searchString, $options: "i" } }
    ] },
    { _id: 1, name: 1, images: 1, category: 1, ratings: 1, price: 1 }
  );
  return data;
}

export { getProductById, getHomeProducts, getProductsBySearchString };
