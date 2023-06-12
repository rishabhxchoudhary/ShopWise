"use client"
import DeliverySelection from '@/components/Checkout/DeliverySelection';
import Summary from '@/components/Checkout/OrderSummary';
import PaymentSelection from '@/components/Checkout/PaymentSelection';
import React, { use, useEffect, useState } from 'react';

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

const paymentMethods = [
    {
        "method": "Stripe",
        "image": "/Footer/stripe.png"
    },
    {
        "method": "Visa",
        "image": "/Footer/visa.png"
    },
    {
        "method": "MasterCard",
        "image": "/Footer/Mastercard.png"
    },
    {
        "method": "AmazonPay",
        "image": "/Footer/Amazon.png"
    },
    {
        "method": "Klarna",
        "image": "/Footer/Klarna.png"
    },
    {
        "method": "PayPal",
        "image": "/Footer/PayPal.png"
    },
    {
        "method": "GooglePay",
        "image": "/Footer/GooglePay.png"
    },
    {
        "method": "ApplePay",
        "image": "/Footer/ApplePay.png"
    },
    {
        "method": "Cash On Delivery",
    },
    // And more.
];

const data = {
    "addresses": [
      {
        "id": 1,
        "name": "John Doe",
        "mobile": "1234567890",
        "addressLine1": "123 Main St",
        "addressLine2": "Apartment 4B",
        "pincode": "10001",
        "landmark": "Central Park",
        "city": "New York",
        "state": "NY",
        "country": "USA"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "mobile": "9876543210",
        "addressLine1": "456 Elm St",
        "addressLine2": "Unit 5",
        "pincode": "90001",
        "landmark": "Hollywood Walk of Fame",
        "city": "Los Angeles",
        "state": "CA",
        "country": "USA"
      }
    ]
}

const CheckoutPage: React.FC = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);
    const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

    useEffect(() => {
        if (selectedAddressId) {
            const address = data.addresses.find((address) => address.id === selectedAddressId);
            setSelectedAddress(address);
        }
        else{
            setSelectedAddress(undefined);
        }
    },[selectedAddressId])

    return (
    <div className='my-10'>
        <DeliverySelection 
        addresses={data.addresses} 
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
        />
        <PaymentSelection 
        selectedPaymentMethod={selectedPaymentMethod} 
        setSelectedPaymentMethod={setSelectedPaymentMethod} 
        paymentMethods={paymentMethods} 
        />
        <Summary 
        address={selectedAddress} 
        paymentMethod={selectedPaymentMethod}
        cartItems={[]} 
        />

    </div>
    );
}

export default CheckoutPage;