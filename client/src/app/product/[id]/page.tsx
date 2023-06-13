import ProductPage from '@/components/ProductPage/ProductPage';
import { useParams } from 'next/navigation'
import React from 'react'


export default async function Page() {
    const id = useParams().id;
    
    return (
        <div>
            <ProductPage/>
        </div>
    )
}