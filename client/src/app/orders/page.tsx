import Orders  from "@/components/Orders/Orders";
type Order = {
    orderId: string;
    orderDate: string;
    status: string;
    items: {
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }[];
  };

function getStatus():string{
  let statuses:string[] = ['On the way',"Delivered",'Cancelled']
  let index = Math.floor(Math.random() * 3)
  return statuses[index]
}

const ordersData:Order[] = [
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
  {
    "orderId": "12345",
    "orderDate": "2023-06-10",
    "status": getStatus(),
    "items": [
      {
        "productId": "67890",
        "name": "Product A",
        "quantity": 2,
        "price": 19.99
      },
      {
        "productId": "12345",
        "name": "Product B",
        "quantity": 1,
        "price": 12.99
      }
    ]
  },
]

const YourOrdersPage: React.FC = () => {
  return (
    <div className="pt-5">
      <Orders orders={ordersData} />
    </div>
  );
};

export default YourOrdersPage;
