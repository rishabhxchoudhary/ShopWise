import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Product {
  link: string;
  image: string;
}

interface HomePageCarouselProps {
  products: Product[];
}

const HomePageCarousel: React.FC<HomePageCarouselProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === products.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Slide changes every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-full mx-auto border border-red-500">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <a href={product.link} className="block">
                <Image
                  height={2000}
                  width={2000}
                  src={product.image}
                  alt="Product"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '60vh' }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -mt-8 left-4 flex items-center">
        <button
          onClick={handlePreviousSlide}
          className="p-2 bg-green-800 hover:bg-green-700 rounded-full focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 -mt-8 right-4 flex items-center">
        <button
          onClick={handleNextSlide}
          className="p-2 bg-green-800 hover:bg-green-700 rounded-full focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute flex justify-center w-full bottom-4">
        {products.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentSlide === index ? 'bg-green-800' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCarousel;
