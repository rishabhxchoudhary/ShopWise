"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
    const id = useParams().id;
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/product/getProductDetails`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: "1232"
                })
            })
            const data = await res.json()
            console.log(data)
        }
        getData();
    })

    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {id}</p>
        </div>
    )
}