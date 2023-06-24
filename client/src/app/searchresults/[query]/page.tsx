import ProductCard from '@/components/Search/ProductCard';
import { getProductsBySearchString } from '@/controller/productController';
import React from 'react';
// import { useDispatch } from 'react-redux';

export default async function Page({params}:any) {
  const { query } = params;
  const searchData = await getProductsBySearchString(query);
  return (
    <div className="container mx-auto pt-16 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {searchData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
