
"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { start, stop } from '@/redux/features/loading/loadingSlice';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Page() {
  const dispatch = useDispatch();
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    async function getData() {
      dispatch(start());
      const res = await fetch('/api/home');
      const data = await res.json();
      const products = data.data;
      setGroupedProducts(products);
      dispatch(stop());
    }

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {Object.values(groupedProducts).map((products) =>
          products.map((product) => (
            <Link key={product.name} href={`/product/${product.id}`}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex p-6 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-center w-2/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 w-3/5 bg-white">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-500 mb-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-green-900 font-bold">${product.price}</p>
                    <div className="flex items-center ml-4">
                      <span className="text-yellow-500 mr-1">&#9733;</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
