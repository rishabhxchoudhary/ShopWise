import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { bool } from 'sharp';

type Review = {
  author: string;
  rating: number;
  comment: string;
};

type ReviewsProps = {
  reviews: Review[];
  id: string;
};

const Reviews: React.FC<ReviewsProps> = ({ reviews, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const { data: session } = useSession();
  const authorName = session?.user?.name;
  
  const [newReview, setNewReview] = useState<Review>({ author: '', rating: 0, comment: '' });

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleAddReview = () => {
    setIsAddingReview(!isAddingReview);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview((prevReview) => ({ ...prevReview, rating }));
  };

  const handleAddReview = async () => {
    const newReviews = [...reviews, { ...newReview, author: authorName }];
    await fetch('/api/product/addReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newReviews: newReviews , productId: id }),
    });
    console.log(JSON.stringify({ newReviews: newReviews , productId: id }))
    setNewReview({ author: '', rating: 0, comment: '' });
    setIsAddingReview(false);
  };

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index: number) => {
      setHoverRating(index);
    };

    const handleMouseLeave = () => {
      setHoverRating(0);
    };

    const handleClick = (index: number) => {
      handleRatingChange(index);
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            className={`w-12 h-8 text-lg sm:text-3xl mr-1 focus:outline-none ${
              (hoverRating || newReview.rating) >= index ? 'text-yellow-500' : 'text-gray-400'
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <div onClick={handleToggleExpand} className="cursor-pointer flex items-center justify-between">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <button className="text-sm text-gray-600 focus:outline-none">
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isAddingReview && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <div className="flex items-center">
              <StarRating rating={newReview.rating} />
              <span className='ml-2 text-2xl'>{newReview.rating}</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Review</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder={`What's your opinion about this product?`}
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleAddReview}
          >
            Add Review
          </button>
        </div>
      )}
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
      {!isAddingReview && (
        <div className="mt-4">
          {session && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleToggleAddReview}
            >
              Add Review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
