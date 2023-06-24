import connectToDatabase from "@/database/db";
import Orders from "@/models/orders";
import { getAllOrders } from "./userController";

async function createOrder(order: any) {
  await connectToDatabase();
  const data = await Orders.create(order);
  return data;
}

async function getOrderById(id: String) {
  await connectToDatabase();
  const data = await Orders.findOne({
    _id: id,
  });
  return data;
}

async function getOrdersByUser(email: string) {
  await connectToDatabase();
  const data = (await getAllOrders(email))[0].orders;
  let orders = [];
  for (let i = 0; i < data.length; i++) {
    const order = await getOrderById(String(data[i]));
    orders.push(order);
  }
  return orders;
}

export { createOrder, getOrderById, getOrdersByUser };
