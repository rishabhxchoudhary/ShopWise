"use client"
import CSS from '@/components/Cart/Cart.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { start, stop } from "@/redux/features/loading/loadingSlice";
import { useSession } from 'next-auth/react';
import CheckoutComponent from '@/components/Cart/Checkout';

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
  const dispatch = useDispatch();
  const { data: session } = useSession()
  const [cartData, setCartData] = useState<CartProduct[]>([]);

  useEffect(() => {

    if (!session ) {
      setCartData(JSON.parse(localStorage.getItem('cart') || '[]'));
      return;
    }

    const getcart = async () =>{
      dispatch(start());
      const cart = await fetch('/api/cart',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cartData = await cart.json();
      console.log(cartData.data)
      setCartData(cartData.data);
      dispatch(stop());
    }
    getcart();

    if (session && localStorage.getItem('cart'))
    {
      const mergeCart = async () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) return;
        const res = await fetch('/api/cart/merge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
        });
        const data = await res.json();
        setCartData(data.data);
        localStorage.setItem('cart', JSON.stringify([]));
      };
      mergeCart();
      console.log('cart merged');
    }
    
  },[]);

  // useEffect(() => {
  //   dispatch(start());
  //   if (cartData.length != 0) {
  //     localStorage.setItem('cart', JSON.stringify(cartData));
  //   }
  //   dispatch(stop());
  // }, [cartData]);

  const handleUpdateQuantity = async (product: CartProduct, newQuantity: number) => {
    if (!session) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const index = cart.findIndex((item: CartProduct) => item._id === product._id);
      if (index === -1) return;
      cart[index].quantity = newQuantity;
      setCartData(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }
    if (newQuantity<1) return;
    dispatch(start());
    const cart = await fetch('/api/cart/changequantity',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productid: product._id,
        quantity: newQuantity,
      }),
    });
    const data = await cart.json();
    setCartData(data.data);
    dispatch(stop());
  };

  const handleRemoveItem = async (product: CartProduct) => {
    if (!session) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const index = cart.findIndex((item: CartProduct) => item._id === product._id);
      if (index === -1) return;
      cart.splice(index, 1);
      setCartData(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }
    dispatch(start());
    const cart = await fetch('/api/cart/remove',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productid: product._id,
      }),
    })
    const data = await cart.json();
    setCartData(data.data);
    dispatch(stop());
  };

  return (
    <div className={`flex flex-col md:flex-row`}>
      
        {cartData.length === 0 ? (<>
        <div className='py-10 min-h-50vh'>
          <p>No Items in your Cart</p>
        </div>
        </>) : (
        <>
        <div className={`${CSS.left} lg:max-h-[80vh]`}>
        {cartData.map((product) => (
          <div
          key={product._id}
          className="flex flex-wrap items-center border-b py-4"
          >
              <Image
                height={100}
                width={100}
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded mr-2"
                />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">
                  {product.name}
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => handleRemoveItem(product)}
                    >
                    <svg className='h-[20px] w-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="30px" height="30px" fillRule="nonzero">
                      <g fill="#ff0000" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </h2>
                { product.variant.map((option) => (
                  <p key={option.option} className="text-sm mb-1">
                    {option.option}: {option.value}
                  </p>
                ))}
                <p className="text-gray-500 mb-2">
                  Price: ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center">
                <button
                  className="px-3 py-2 border border-gray-300 rounded-l"
                  onClick={()=>{
                    handleUpdateQuantity(
                      product,
                      product.quantity - 1
                      )
                    }}
                    >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 focus:outline-none px-3 py-2 text-center border-t border-b border-gray-300"
                  value={product.quantity}
                  readOnly
                  />
                <button
                  className="px-3 py-2 border border-gray-300 rounded-r"
                  onClick={()=>{
                    handleUpdateQuantity(product, product.quantity + 1);
                  }}
                  >
                  +
                </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={`${CSS.right}`}>
        <CheckoutComponent cartData={cartData}/>
      </div>
                 </>)}
    </div>
  );
};

export default CartPage;
