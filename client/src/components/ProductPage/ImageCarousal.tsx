import Image from 'next/image';
import { useState } from 'react';

type CarouselProps = {
  images: { [key: string]: string };
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const imageKeys = Object.keys(images);
  const [currentImage, setCurrentImage] = useState<string | null>(imageKeys[0]);

  const handleClickDot = (key: string) => {
    setCurrentImage(key);
  };

  return (
    <div className="relative h-full max-w-6/12 overflow">
      {currentImage && (
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={images[currentImage]}
            alt={currentImage}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <div className="flex justify-center mt-2">
        {imageKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleClickDot(key)}
            className={`h-2 w-2 rounded-full mx-1 focus:outline-none ${
              currentImage === key ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
