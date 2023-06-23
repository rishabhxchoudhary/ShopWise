"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { start, stop } from '@/redux/features/loading/loadingSlice';
import ProductCard from '@/components/Search/ProductCard';
import { useParams } from 'next/navigation';

export default function Page() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const searchQuery = useParams().query;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(start());
      try {

        const response = await fetch(`/api/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: searchQuery
          })
        });
        const data = await response.json();
        setSearchData(data.data);
      } catch (error) {
        console.error('Error fetching search data: ', error);
      }
      dispatch(stop());
    };
    fetchData();

  }, []);

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
