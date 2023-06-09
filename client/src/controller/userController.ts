import connectToDatabase from "@/database/db";
import User from "@/models/user";

async function getaddress(email: string) {
  await connectToDatabase();
  const data = User.findOne({ email: email });
  return data;
}

async function addOrder(email: string, order: Object) {
  await connectToDatabase();
  const data = await User.findOneAndUpdate(
    { email: email },
    { $push: { orders: order } }
  );
  return data;
}

async function getAllOrders(email: string) {
  await connectToDatabase();
  const data = await User.find({ email: email }, { orders: 1 });
  return data;
}

async function addNewAddress(email: string, newAddress: string) {
  await connectToDatabase();
  const data = await User.findOneAndUpdate(
    { email: email },
    { $push: { addresses: newAddress } }
  );
  return data;
}

async function removeAddress(email: string, addressID: number) {
  await connectToDatabase();
  const data = await User.findOneAndUpdate(
    { email: email },
    { $pull: { addresses: { id: addressID } } }
  );
}

async function getAddressById(email: string, addressId: number) {
  await connectToDatabase();
  const data = await User.findOne(
    { email: email },
    { addresses: { $elemMatch: { id: addressId } } }
  );
  return data;
}

export {
  getaddress,
  addNewAddress,
  removeAddress,
  addOrder,
  getAllOrders,
  getAddressById,
};
