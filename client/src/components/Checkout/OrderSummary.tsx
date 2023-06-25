"use client"
import { start, stop } from "@/redux/features/loading/loadingSlice";
import getStripe from "@/utils/get-stripe";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Stripe from "stripe";

interface Address {
  id: number;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
}

interface Variant {
  option: string;
  value: string;
}

interface CartProduct {
  _id: string;
  name: string;
  image: string;
  variant: Variant[];
  price: number;
  quantity: number;
}

interface SummaryProps {
  address: Address | undefined;
  cartItems: CartProduct[];
  paymentMethod: string | null;
}

const Summary: React.FC<SummaryProps> = ({ address, paymentMethod }) => {
  const [orderId, setOrderId] = useState("");
  const [cartData, setCartData] = useState<CartProduct[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const generateOrderId = () => {
      const randomNum = Math.floor(Math.random() * 1000);
      const timestamp = Date.now();
      const generatedId = randomNum * timestamp;
      setOrderId(String(generatedId));
    };
    const getcart = async () =>{
      dispatch(start());
      const cart = await fetch('/api/cart',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cartData = await cart.json();
      setCartData(cartData.data);
      dispatch(stop());
    }
    getcart();
    generateOrderId();
  }, []);

  const getTotalAmount = (): number => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="bg-white shadow border rounded p-4 m-1">
        {address && cartData.length > 0 && paymentMethod && (
          <>
          <div className="mb-5">
            <div> <span className="text-lg font-bold">Order ID: </span>{orderId}</div>
            <div className="flex flex-col py-2"> 
            <span className="text-lg font-bold">Delivery Address</span>
              <span className="font-semibold">{address.name}</span>
              <span>{address.mobile}</span>
              <span>{address.addressLine1}, {address.addressLine2}</span>
              <span>{address.landmark}</span>
            </div>
            <div className="py-2"> <span className="text-lg font-bold">Payment Method: </span>{paymentMethod}</div>
            <div className="py-2">
            <span className="font-bold text-lg pb-1">Ordered Items: </span>
            {cartData.map((item) => (
              <div key={item._id} className="flex justify-start">
                <span className="font-bold pr-2">{item.name}</span> {item.variant.map((variant) => ( <span className="pr-1" key={variant.option}> {variant.option}: {variant.value},</span>) )}
                <span> {item.quantity} x ₹{item.price}</span>
              </div>
            ))}
            </div>
            <div className="py-2"> <span className="font-bold">Total Amount: </span>₹{getTotalAmount()}</div>
          </div>
          <button onClick={async ()=>{
            const res = fetch('/api/checkout_session',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: getTotalAmount(),
                addressId: address.id,
              })
            })
            const checkoutSession: Stripe.Checkout.Session = await (await res).json();
            // console.log(checkoutSession);
            const stripe = await getStripe();
            const { error } = await stripe!.redirectToCheckout({
              sessionId: checkoutSession.id,
            });
          }} disabled={false} className='bg-black text-white px-6 py-2'>Place Order</button>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Summary;
