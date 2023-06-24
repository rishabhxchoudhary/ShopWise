import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { clearCart, getCart } from "@/controller/cartController";
import { createOrder } from "@/controller/orderController";
import { addOrder, getAddressById } from "@/controller/userController";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export default async function Home({params}:any) {
    async function getStripe() {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
            apiVersion: "2022-11-15",
          });
        const checkoutSession = await stripe.checkout.sessions.retrieve(params.sessionId);
        
        return checkoutSession;
    }
    const checkoutSession: Stripe.Checkout.Session = await getStripe();
    // console.log(checkoutSession.client_reference_id);

    if (checkoutSession.payment_status == 'paid'){
        try{
            const session = await getServerSession(authOptions);
            const cartId = session.user.cart;
            const cart = await getCart(cartId);
            const data1 =  await getAddressById(session.user.email , Number(checkoutSession.client_reference_id))
            const order = {
                orderDate: new Date().toLocaleDateString(),
                items: cart?.items,
                sessionId: params.sessionId,
                Address: data1?.addresses[0]
            }
            const data = await createOrder(order);
            await addOrder(session.user.email, String(data._id));
            await clearCart(cartId);
            return (
                <div>
                    <h1>Payment is Successful....Order Has been created!</h1>
                    <h2>Order Id: {data._id}</h2>
                </div>
            )
        }
        catch (err){
            return (
                <div>
                    <h1>Cannot Create Another order with same session ID....</h1>
                </div>
            )
        }

    }
    else{
        return (
            <div>
                <h1>Payment Failed....</h1>
            </div>
        )
    }
}