import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: { $oid: string };
  image: string;
  name: string;
  category: string;
  price: number;
  rating: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [showAll, setShowAll] = useState(false);
  const maxVisibleCards = 4; // Maximum number of cards to show in each line on mobile

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const visibleProducts = showAll ? products : products.slice(0, maxVisibleCards);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const imageHoverVariants = {
    hover: { scale: 1.05 },
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <AnimatePresence initial={false} key={String(product._id)}>
            <Link href={`/product/${product._id}`}>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                className="bg-white rounded-lg p-4 sm:p-6 shadow-lg cursor-pointer flex flex-col"
              >
                <div className="flex justify-center mb-4 sm:mb-6">
                  <motion.div
                    whileHover="hover"
                    variants={imageHoverVariants}
                    className="w-auto h-40 sm:h-48 relative"
                  >
                    <Image
                      height={100}
                      width={100}
                      src={product.image}
                      alt="Product"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </div>
                <div className="mb-2 sm:mb-4 flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 whitespace-nowrap overflow-hidden">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">{product.category}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 text-base sm:text-lg font-bold mb-1 sm:mb-2">
                      ${product.price}
                    </p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <motion.svg
                          key={index}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            index < product.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: index * 0.1, duration: 0.3 },
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.94 7.94a1 1 0 011.41 0L10 11.59l5.66-5.65a1 1 0 111.41 1.42l-6 6a1 1 0 01-1.41 0l-6-6a1 1 0 010-1.42z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </Link>
          </AnimatePresence>
        ))}
      </div>
      {products.length > maxVisibleCards && (
        <div className="flex justify-center mt-4">
          <button
            className="text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={toggleShowAll}
          >
            {showAll ? 'Hide All' : 'Show All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
