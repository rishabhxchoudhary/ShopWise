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
];


const CheckoutPage: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

    useEffect(() => {
        const getAddresses = async () =>{
            const response = await fetch('/api/address/fetch',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setAddresses(data.data.addresses);
        }
        getAddresses();
    },[])

    useEffect(() => {
        if (selectedAddressId) {
            const address = addresses.find((address) => address.id === selectedAddressId);
            setSelectedAddress(address);
        }
        else{
            setSelectedAddress(undefined);
        }
    },[selectedAddressId])

    return (
    <div className='mb-10'>
        <DeliverySelection 
        addresses={addresses} 
        setAddresses={setAddresses}
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