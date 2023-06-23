import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount } = body;
  try {
    // Create Checkout Sessions from body params.
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            unit_amount: Math.ceil(amount * 100),
            product_data: {
              name: "Shopwise",
            },
          },
        },
      ],
      success_url: `${req.nextUrl.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/paymentfailed`,
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    const { id: CHECKOUT_SESSION_ID } = checkoutSession;
    checkoutSession.success_url = `${req.nextUrl.origin}/result?session_id=${CHECKOUT_SESSION_ID}`;
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ data: [] });
}
