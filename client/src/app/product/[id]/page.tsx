"use client"
import ProductPage from '@/components/ProductPage/ProductPage';
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const id = useParams().id;
    return (
        <div>
            <ProductPage/>
        </div>
    )
}