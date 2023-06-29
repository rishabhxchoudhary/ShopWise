"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const SellPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    variants: [],
    images: {},
    ratings: {
      average: 0,
      count: 0,
    },
    reviews: [],
    specifications: {},
    tags: [],
    metaDescription: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddVariant = () => {
    setFormData((prevData) => ({
      ...prevData,
      variants: [
        ...prevData.variants,
        {
          option: '',
          values: [],
          availability: [],
        },
      ],
    }));
  };

  const handleVariantOptionChange = (index, e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const variants = [...prevData.variants];
      variants[index].option = value;
      return {
        ...prevData,
        variants,
      };
    });
  };
  const handleVariantValueChange = (index, subIndex, e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const variants = [...prevData.variants];
      variants[index].values[subIndex] = value;
      return {
        ...prevData,
        variants,
      };
    });
  };

const handleAddVariantValue = (index) => {
    const newVariantValues = [...formData.variants[index].values, ''];
    const newVariantAvailability = [...formData.variants[index].availability, ''];
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      values: newVariantValues,
      availability: newVariantAvailability,
    };
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      variants: updatedVariants,
    }));
  };
  

  const handleVariantAvailabilityChange = (index, subIndex, e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const variants = [...prevData.variants];
      variants[index].availability[subIndex] = value;
      return {
        ...prevData,
        variants,
      };
    });
  };

  const handleAddReview = () => {
    setFormData({
      ...formData,
      reviews: [...formData.reviews, { author: '', rating: 0, comment: '' }],
    });
  };

  const handleReviewAuthorChange = (index, e) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[index].author = e.target.value;
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const handleReviewRatingChange = (index, e) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[index].rating = Number(e.target.value);
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const handleReviewCommentChange = (index, e) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[index].comment = e.target.value;
    setFormData({ ...formData, reviews: updatedReviews });
  };

// Function to handle specification name change
const handleSpecificationNameChange = (oldName, newName) => {
  setFormData((prevFormData) => {
    const updatedSpecifications = { ...prevFormData.specifications };
    const values = updatedSpecifications[oldName];
    delete updatedSpecifications[oldName];
    updatedSpecifications[newName] = values;
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};

// Function to handle specification value change
const handleSpecificationValueChange = (name, index, event) => {
  const { value } = event.target;
  setFormData((prevFormData) => {
    const updatedSpecifications = { ...prevFormData.specifications };
    updatedSpecifications[name][index] = value;
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};

// Function to add a new specification
const handleAddSpecification = () => {
  setFormData((prevFormData) => {
    const updatedSpecifications = {
      ...prevFormData.specifications,
      [`${Date.now()}`]: [],
    };
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};

// Function to add a new value for a specification
const handleAddSpecificationValue = (name) => {
  setFormData((prevFormData) => {
    const updatedSpecifications = {
      ...prevFormData.specifications,
      [name]: [...prevFormData.specifications[name], ""],
    };
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};

// Function to remove a specification
const handleRemoveSpecification = (name) => {
  setFormData((prevFormData) => {
    const updatedSpecifications = { ...prevFormData.specifications };
    delete updatedSpecifications[name];
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};

// Function to remove a value from a specification
const handleRemoveSpecificationSubValue = (name, index) => {
  setFormData((prevFormData) => {
    const updatedSpecifications = { ...prevFormData.specifications };
    updatedSpecifications[name].splice(index, 1);
    return {
      ...prevFormData,
      specifications: updatedSpecifications,
    };
  });
};


  const handleSubmit = (e) => {
    e.preventDefault();
      // API Call yaha pe hoga to add product to database
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl ml-8 font-bold mb-6">Add Your Product To Our Catalogue.</h1>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=" max-w-6xl grid grid-cols-2 gap-6 mx-auto"
      >
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Brand */}
        <div className="mb-6">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

 {/* Variants */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">Variants</label>
  {formData.variants.map((variant, index) => (
    <div key={index} className="mt-3">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder="Option"
          value={variant.option}
          onChange={(e) => handleVariantOptionChange(index, e)}
          required
          className="flex-1 mr-2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={() => handleRemoveVariant(index)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-red-500 focus:border-red-500"
        >
          Remove Variant
        </button>
      </div>
      {variant.values.map((value, subIndex) => (
        <div key={subIndex} className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => handleVariantValueChange(index, subIndex, e)}
            required
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <select
            value={variant.availability[subIndex]}
            onChange={(e) => handleVariantAvailabilityChange(index, subIndex, e)}
            required
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button
            type="button"
            onClick={() => handleRemoveVariantValue(index, subIndex)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            Remove Value
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddVariantValue(index)}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        Add Value
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddVariant}
    className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  >
    Add Variant
  </button>
</div>





        {/* Images */}
        <div className="mb-6">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <input
            type="text"
            id="images"
            name="images"
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Ratings */}
        <div className="mb-6">
          <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
            Ratings
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="Average"
              id="average"
              name="average"
              value={formData.ratings.average}
              onChange={handleChange}
              required
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Count"
              id="count"
              name="count"
              value={formData.ratings.count}
              onChange={handleChange}
              required
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
            Reviews
          </label>
          {formData.reviews.map((review, index) => (
            <div key={index} className="mt-3">
              <div className="flex items-center space-x-3 mb-2">
                <input
                  type="text"
                  placeholder="Author"
                  value={review.author}
                  onChange={(e) => handleReviewAuthorChange(index, e)}
                  required
                  className="flex-1 mr-2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <select
                  value={review.rating}
                  onChange={(e) => handleReviewRatingChange(index, e)}
                  required
                  className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value={0}>Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <textarea
                placeholder="Comment"
                value={review.comment}
                onChange={(e) => handleReviewCommentChange(index, e)}
                required
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddReview}
            className="mt-3 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Add Review
          </button>
        </div>
{/* Specifications */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">Specifications</label>
  {Object.entries(formData.specifications).map(([name, values], index) => (
    <div key={index} className="mt-3">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder="Specification Name"
          value={name}
          onChange={(e) => handleSpecificationNameChange(name, e.target.value)}
          required
          className="flex-1 mr-2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={() => handleRemoveSpecification(name)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-red-500 focus:border-red-500"
        >
          Remove Specification
        </button>
      </div>
      {values.map((value, subIndex) => (
        <div key={subIndex} className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => handleSpecificationValueChange(name, subIndex, e)}
            required
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => handleRemoveSpecificationSubValue(name, subIndex)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            Remove Value
          </button>
        </div>
      ))}
      <div className="flex items-center mt-2">
        <button
          type="button"
          onClick={() => handleAddSpecificationValue(name)}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Add Value
        </button>
      </div>
    </div>
  ))}
  <div className="mt-3">
    <button
      type="button"
      onClick={handleAddSpecification}
      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      Add Specification
    </button>
  </div>
</div>






        {/* Tags */}
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Meta Description */}
        <div className="mb-6">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            required
            rows="2"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default SellPage;
