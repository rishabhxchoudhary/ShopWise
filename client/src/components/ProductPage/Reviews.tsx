import { useState } from 'react';

type Review = {
  author: string;
  rating: number;
  comment: string;
};

type ReviewsProps = {
  reviews: Review[];
};

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <div onClick={handleToggleExpand} className="cursor-pointer flex items-center justify-between">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <button className="text-sm text-gray-600 focus:outline-none">
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <ul className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 mr-3 bg-gray-300 rounded-full flex items-center justify-center">
                {review.rating}
              </div>
              <div>
                <div className="text-sm font-semibold">{review.author}</div>
                <div className="text-gray-600">{review.comment}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
