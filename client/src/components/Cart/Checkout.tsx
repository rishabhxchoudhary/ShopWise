import React, { useEffect } from 'react';
import { useSession } from "next-auth/react"
import Link from 'next/link';

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
  
interface CheckoutComponentProps {
    cartData: CartProduct[];
}

const CheckoutComponent: React.FC<CheckoutComponentProps> = ({cartData}) => {
    const { data: session } = useSession()
    const [cartTotal, setCartTotal] = React.useState<number>(0);
    const [cartQuantity, setCartQuantity] = React.useState<number>(0);


    useEffect(()=>{
        let total = 0;
        let quantity = 0;
        cartData.forEach((item) => {
            total += item.price * item.quantity;
            quantity += item.quantity;
        });
        setCartTotal(total);
        setCartQuantity(quantity);
    },[cartData])

  return (
    <div className="flex flex-col items-center bg-transparent">
      <h2 className="text-2xl font-bold mb-4">Price Details</h2>
      <div className="text-black rounded-lg p-6 w-1/2">

        <p className="text-lg mb-2">Price({cartQuantity} items): <span className='text-green-500 font-semibold'>₹{cartTotal}</span> </p>
        {session?.user ? (
          <>
            <Link href={"/checkout"} className="bg-black text-white px-4 py-2 rounded-md mt-4">
              Checkout
            </Link>
          </>
        ) : (
          <p className="text-lg mb-2">Please log in to proceed with the checkout.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutComponent;
