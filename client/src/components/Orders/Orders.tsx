import Link from "next/link";
import { redirect } from "next/navigation";

type Order = {
  _id: string;
  orderDate: string;
  status: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  sessionId: string;
  Address: Object;
};

type OrdersProps = {
  orders: Order[];
};

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const ordersPerPage = 5;

  // Calculate pagination indexes
  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Define box color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On the way":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.map((order) => (
        <Link href={`/orders/${order._id}`} key={order._id}>
          <div className={`bg-white p-4 mb-4 shadow`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                Order #{String(order._id)}
              </h2>
              <p className="text-sm">
                {new Date(order.orderDate).toDateString()}
              </p>
            </div>
            <div className="mb-2">
              <h3 className={`text-sm font-semibold`}>
                Status:{" "}
                <span className={`${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </h3>
            </div>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId} className="mb-1">
                  <p className="text-sm">
                    {item.name} - Quantity: {item.quantity} - Price: $
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}

      {/* Pagination */}
      {/* <div className="flex justify-center py-10">
        {currentPage > 1 && (
          <button
            className="mx-1 px-2 py-1 rounded bg-black text-white"
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === currentPage ||
            pageNumber === currentPage - 1 ||
            pageNumber === currentPage + 1 ||
            pageNumber === orders.length / ordersPerPage
          ) {
            return (
              <button
                key={index}
                className={`mx-1 px-2 py-1 rounded ${
                  currentPage === pageNumber ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === currentPage + 2 || pageNumber === currentPage - 2) {
            return <span key={index}>...</span>;
          }
          return null;
        })}

        {currentPage < Math.ceil(orders.length / ordersPerPage) && (
          <button
            className="mx-1 px-2 py-1 rounded bg-black text-white"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Orders;
