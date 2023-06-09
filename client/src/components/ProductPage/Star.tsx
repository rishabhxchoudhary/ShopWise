import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {Array.from({ length: filledStars }, (_, index) => (
        <svg
          key={index}
          className="w-6 h-6 fill-current text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1.25l2.736 5.615 6.142.894-4.452 4.333 1.051 6.13L10 16.25l-5.477 2.927 1.05-6.13L1.122 7.754l6.142-.894L10 1.25z"
          />
        </svg>
      ))}

      {hasHalfStar && (
        <svg
          className="w-6 h-6 fill-current text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1.25l2.736 5.615 6.142.894-4.452 4.333 1.051 6.13L10 16.25V1.25z"
          />
        </svg>
      )}

      {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
        <svg
          key={index}
          className="w-6 h-6 fill-current text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1.25l2.736 5.615 6.142.894-4.452 4.333 1.051 6.13L10 16.25l-5.477 2.927 1.05-6.13L1.122 7.754l6.142-.894L10 1.25z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
