"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const imageKeys = Object.keys(product.images);
  const currentImage = imageKeys[0];

  return (
    <motion.div
      className="w-full h-96 bg-white rounded-lg p-6 shadow-md flex flex-col justify-between"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
        <Link href={`/product/${product._id}`}>
      <div className="relative h-52">
        <Image
          src={product.images[currentImage]}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-start">
          <p className="text-gray-400 text-xs">{product.category}</p>
          <p className="text-gray-800 font-semibold">${product.price}</p>
        </div>
        <div className="flex items-end mt-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex justify-items-center	 ml-auto">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index < Math.floor(product.ratings.average) ? 'gold' : 'gray'}
                className="w-4 h-4"
              >
                <path d="M12 2l3.09 6.32L22 9.36l-5 4.86 1.18 6.88L12 18.73l-6.18 3.37L7 14.22l-5-4.86 6.91-.04L12 2z" />
              </svg>
            ))}
            <p className="text-gray-600 text-sm ml-1">
              ({product.ratings.average.toFixed(1)})
            </p>
          </div>
        </div>
      </div>
        </Link>
    </motion.div>
  );
}
