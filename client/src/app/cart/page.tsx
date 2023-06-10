"use client"
import CSS from '@/components/Cart/Cart.module.css';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

interface CartProduct {
  _id: string;
  name: string;
  image: string;
  variant: {
    option: string;
    value: string;
  }[];
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {

  const [cartData, setCartData] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }

  },[]);

  useEffect(() => {
    if (cartData.length != 0) {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }, [cartData]);

  const handleUpdateQuantity = (product: CartProduct, newQuantity: number) => {
    const updatedCart = cartData.map((p) => {
      if (p === product) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    setCartData(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartData.filter((product) => product._id !== productId);
    setCartData(updatedCart);
  };

  return (
    <div className={`${CSS.main}`}>
      <div className={`${CSS.left}`}>
        left
        {/* <pre>{JSON.stringify(cartData)}</pre> */}
        {cartData.map((product) => (
            <div
              key={product._id}
              className="flex items-center border-b py-4"
            >
              <Image
                height={100}
                width={100}
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">
                  {product.name}
                </h2>
                {product.variant.map((option) => (
                  <p key={option.option} className="text-sm mb-1">
                    {option.option}: {option.value}
                  </p>
                ))}
                <p className="text-gray-500 mb-2">
                  Price: ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center">
                  <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${product._id}`}
                    className="border rounded px-2 py-1 ml-2 w-16"
                    value={product.quantity}
                    onChange={(e) =>{
                      handleUpdateQuantity(
                        product,
                        parseInt(e.target.value)
                      )
                      console.log("first");
                    }
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => handleRemoveItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={`${CSS.right}`}>
        right
      </div>
    </div>
  );
};

export default CartPage;
