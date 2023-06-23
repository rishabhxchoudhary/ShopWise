import connectToDatabase from "@/database/db";
import User from "@/models/user";

async function getaddress(email: string) {
  await connectToDatabase();
  const data = User.findOne({ email: email });
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
export { getaddress, addNewAddress, removeAddress };
