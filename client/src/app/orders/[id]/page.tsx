import { getOrderById } from "@/controller/orderController";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const OrderPage = async ({ params }) => {
  const { id } = params;
  try {
    const order = await getOrderById(id);

    if (order) {
      return (
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Order Details</h1>

          <div className="bg-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Order ID: {String(order._id)}
            </h2>
            <p className="text-sm text-gray-500">
              Order Date: {order.orderDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
          </div>

          <div className="bg-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {order.Address.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Mobile:</span>{" "}
              {order.Address.mobile}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address Line 1:</span>{" "}
              {order.Address.addressLine1}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address Line 2:</span>{" "}
              {order.Address.addressLine2}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Landmark:</span>{" "}
              {order.Address.landmark}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span> {order.Address.city}
            </p>
            <p className="mb-2">
              <span className="font-semibold">State:</span>{" "}
              {order.Address.state}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Country:</span>{" "}
              {order.Address.country}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Pincode:</span>{" "}
              {order.Address.pincode}
            </p>
          </div>

          <div className="bg-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {order.items.map((item: OrderItem) => (
              <Link href={`/product/${item._id}`} key={item._id}>
                <div key={item._id} className="flex items-center mb-4">
                  <Image
                    height={80}
                    width={80}
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Variant:{" "}
                      {item.variant
                        .map((v) => `${v.option}: ${v.value}`)
                        .join(", ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* {order.status === 'On the way' && (
        <div className="bg-gray-100 p-6 mb-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCancelOrder}
          >
            Request Cancellation
          </button>
        </div>
      )} */}
        </div>
      );
    }
    return <div>Something went wront.</div>;
  } catch (err) {
    console.log(err);
    return <div>Order not found!</div>;
  }
};

export default OrderPage;
