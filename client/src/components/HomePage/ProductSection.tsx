import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Product:
// {
// _id : {$oid: "60f6d9b6e3c7d0001c000001"}
// }

interface Product {
  _id: { $oid: string }
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 z-10 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product, index) => (
          <AnimatePresence initial={false} key={String(product._id)}>
            <Link href={`/product/${product._id}`}>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                className="bg-white z-10 rounded-lg p-6 shadow-lg cursor-pointer"
              >
                <div className="flex justify-center mb-6">
                  <Image height={100} width={100} src={product.image} alt="Product" className="w-auto h-48 object-contain" />
                </div>
                <div className="mb-4 z-0">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 z-0">{product.category}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800 text-lg font-bold mb-2">${product.price}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < product.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.94 7.94a1 1 0 011.41 0L10 11.59l5.66-5.65a1 1 0 111.41 1.42l-6 6a1 1 0 01-1.41 0l-6-6a1 1 0 010-1.42z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </AnimatePresence>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* show this button only if there are more than 4 products */}
        {products.length > maxVisibleCards && (
          <button
            className="text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={toggleShowAll}
          >
            {showAll ? 'Hide All' : 'Show All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
