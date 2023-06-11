import React, { useState } from 'react';

const HomePageCarousel = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative w-full max-w-full mx-auto">
      <div className="overflow-hidden">
        <div className="flex flex-row">
          {products.map((product, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <a href={product.link} className="block">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full object-cover"
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute flex justify-center w-full bottom-4">
        {products.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${currentSlide === index ? 'bg-green-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCarousel;
