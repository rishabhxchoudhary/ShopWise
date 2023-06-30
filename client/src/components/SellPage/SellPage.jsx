"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const variants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
};

const Sell = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [variants, setVariants] = useState([
        { option: '', values: [''], availability: [''] },
    ]);
    const [tags, setTags] = useState(['']);
    const [images, setImages] = useState({});
    const [ratings, setRatings] = useState({ average: 0, count: 0 });
    const [specifications, setSpecifications] = useState({}); // [{ key: '', value: '[]' }
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { label: 'Name', placeholder: 'Enter product name' },
        { label: 'Description', placeholder: 'Enter product description' },
        { label: 'Category', placeholder: 'Enter product category' },
        { label: 'Brand', placeholder: 'Enter product brand' },
        { label: 'Price', placeholder: 'Enter product price' },
        { label: 'Variants', placeholder: 'Enter product variants' },
        { label: 'Images', placeholder: 'Enter product images' },
        { label: 'Tags', placeholder: 'Enter product tags' },
        { label: 'Specifications', placeholder: 'Enter product specifications' },
        { label: 'Ratings', placeholder: 'Enter product Ratings' },
        { label: 'Summary', placeholder: 'Summary of entered data' },
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => prevSlide + 1);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => prevSlide - 1);
    };

    const handleOptionChange = (index, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index].option = value;
        setVariants(updatedVariants);
    };

    const handleValueChange = (variantIndex, valueIndex, value) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].values[valueIndex] = value;
        setVariants(updatedVariants);
    };

    const handleAvailabilityChange = (variantIndex, valueIndex, value) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].availability[valueIndex] = value;
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { option: '', values: [''], availability: [''] }]);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleAddValue = (index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].values.push('');
        updatedVariants[index].availability.push('In Stock');
        setVariants(updatedVariants);
    };

    const handleRemoveValue = (variantIndex, valueIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].values.splice(valueIndex, 1);
        updatedVariants[variantIndex].availability.splice(valueIndex, 1);
        setVariants(updatedVariants);
    };

    const handleTagsChange = (index, value) => {
        const updatedTags = [...tags];
        updatedTags[index] = value;
        setTags(updatedTags);
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const handleImagesChange = (key, value) => {
        const updatedImages = { ...images };
        updatedImages[key] = value;
        setImages(updatedImages);
    };

    const handleSpecificationsChange = (key, value) => {
        const updatedSpecifications = { ...specifications };
        //change the key of the object
        updatedSpecifications[value] = updatedSpecifications[key];
        delete updatedSpecifications[key];
        setSpecifications(updatedSpecifications);
    };

    const handleAddSpecification = () => {
        const updatedSpecifications = { ...specifications };
        updatedSpecifications[''] = [''];
        setSpecifications(updatedSpecifications);
    };

    const handleRemoveSpecification = (key) => {
        const updatedSpecifications = { ...specifications };
        delete updatedSpecifications[key];
        setSpecifications(updatedSpecifications);
    };

    const handleAddSpecificationValue = (key) => {
        const updatedSpecifications = { ...specifications };
        updatedSpecifications[key].push('');
        setSpecifications(updatedSpecifications);
    };

    const handleRemoveSpecificationValue = (key, valueIndex) => {
        const updatedSpecifications = { ...specifications };
        updatedSpecifications[key].splice(valueIndex, 1);
        setSpecifications(updatedSpecifications);
    };

    const handleSpecificationValueChange = (key, valueIndex, value) => {
        const updatedSpecifications = { ...specifications };
        updatedSpecifications[key][valueIndex] = value;
        setSpecifications(updatedSpecifications);
    };

    const handleRatingsChange = (field, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [field]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <div className="max-w-xl mx-auto mb-8 p-8 mt-8 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Sell a Product</h2>
                    <div className="flex">
                        {currentSlide > 0 && (
                            <button
                                onClick={handlePreviousSlide}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 mr-2"
                            >
                                Back
                            </button>
                        )}
                        {currentSlide < slides.length - 1 && (
                            <button
                                onClick={handleNextSlide}
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-gray-200 h-2 rounded-lg">
                        <div
                            className="bg-blue-500 h-2 rounded-lg"
                            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%`, transition: 'width 0.5s ease-in-out' }}
                        ></div>
                    </div>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <motion.div
                        key={currentSlide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={variants}
                    >
                        <div className="mb-4">
                            {currentSlide === 0 && (
                                <>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                        placeholder={slides[currentSlide].placeholder}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </>
                            )}
                            {currentSlide === 1 && (
                                <>
                                    <label className="block text-black text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                        placeholder={slides[currentSlide].placeholder}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </>
                            )}
                            {currentSlide === 2 && (
                                <>
                                    <label className="block text-black text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                        placeholder={slides[currentSlide].placeholder}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </>
                            )}
                            {currentSlide === 3 && (
                                <>
                                    <label className="block text-black text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                        placeholder={slides[currentSlide].placeholder}
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </>
                            )}
                            {currentSlide === 4 && (
                                <>
                                    <label className="block text-black text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                        placeholder={slides[currentSlide].placeholder}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </>
                            )}
                            {currentSlide === 5 && (
                                <>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    {variants.map((variant, index) => (
                                        <div key={index} className="mb-4">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                                                placeholder="Enter option name"
                                                value={variant.option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                            />
                                            {variant.values.map((value, valueIndex) => (
                                                <div key={valueIndex} className="flex mb-2">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline mr-2"
                                                        placeholder="Enter value"
                                                        value={value}
                                                        onChange={(e) => handleValueChange(index, valueIndex, e.target.value)}
                                                    />
                                                    <select
                                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                                        value={variant.availability[valueIndex]}
                                                        onChange={(e) =>
                                                            handleAvailabilityChange(index, valueIndex, e.target.value)
                                                        }
                                                    >
                                                        <option value="In Stock">In Stock</option>
                                                        <option value="Out Of Stock">Out Of Stock</option>
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        onClick={() => handleRemoveValue(index, valueIndex)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            ))}

                                            <div className="flex justify-between mb-4">
                                                <button
                                                    type="button"
                                                    className="px-2 py-1 bg-slate-400 text-white rounded hover:bg-slate-800 mb-2"
                                                    onClick={() => handleAddValue(index)}
                                                >
                                                    Add Value
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-2 py-1 bg-slate-100 text-black rounded hover:bg-slate-300"
                                                    onClick={() => handleRemoveVariant(index)}
                                                >
                                                    Remove Variant
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="px-2 py-1 bg-black text-white rounded hover:bg-slate-600"
                                        onClick={handleAddVariant}
                                    >
                                        Add Variant
                                    </button>
                                </>
                            )}
                            {currentSlide === 6 && (
                                <>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    {/* Images slide */}
                                    {variants.map((variant, index) => (
                                        <div key={index} className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {variant.option}
                                            </label>
                                            {variant.values.map((value, valueIndex) => (
                                                <div key={valueIndex} className="flex mb-2">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline mr-2"
                                                        placeholder={`Enter ${value} variant image`}
                                                        value={images[value]}
                                                        onChange={(e) => handleImagesChange(value, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </>
                            )}
                            {currentSlide === 7 && (
                                <>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    {/* Tags slide */}
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex mb-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                                                placeholder="Enter tag"
                                                value={tag}
                                                onChange={(e) => handleTagsChange(index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                                                onClick={() => handleRemoveTag(index)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={handleAddTag}
                                    >
                                        Add Tag
                                    </button>
                                </>
                            )}
                            {currentSlide === 8 && (
                                <>
                                    <div className="mb-8">
                                        <label className="block text-gray-700 text-xl font-bold mb-2">
                                            {slides[currentSlide].label}
                                        </label>

                                        {/* Specifications slide */}
                                        <div className="mb-4">
                                            {Object.keys(specifications).map((key, index) => (
                                                <div key={index} className="flex items-center mb-4 flex-wrap">
                                                    <div className="flex items-center mb-2 w-full">
                                                        <input
                                                            type="text"
                                                            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:shadow-outline mr-2"
                                                            placeholder="Enter specification name"
                                                            value={key}
                                                            onChange={(e) => handleSpecificationsChange(key, e.target.value)}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                            onClick={() => handleRemoveSpecification(key)}
                                                        >
                                                            -
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap w-full">
                                                        {specifications[key].map((value, valueIndex) => (
                                                            <div key={valueIndex} className="flex items-center mb-2 mr-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-32 px-3 py-2 border rounded focus:outline-none focus:shadow-outline mr-2"
                                                                    placeholder="Enter value"
                                                                    value={value}
                                                                    onChange={(e) =>
                                                                        handleSpecificationValueChange(key, valueIndex, e.target.value)
                                                                    }
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                                    onClick={() => handleRemoveSpecificationValue(key, valueIndex)}
                                                                >
                                                                    -
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                                                        onClick={() => handleAddSpecificationValue(key)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={handleAddSpecification}
                                        >
                                            Add Specification
                                        </button>
                                    </div>
                                </>
                            )}


                            {currentSlide === 9 && (
                                <>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {slides[currentSlide].label}
                                    </label>
                                    {/* Reviews slide */}
                                    <div className="flex mb-2">
                                        <label className="w-32 text-gray-700 text-sm font-bold">
                                            Average:
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline ml-2"
                                            placeholder="Enter average"
                                            value={ratings.average}
                                            onChange={(e) => handleRatingsChange('average', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex mb-2">
                                        <label className="w-32 text-gray-700 text-sm font-bold">
                                            Count:
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline ml-2"
                                            placeholder="Enter count"
                                            value={ratings.count}
                                            onChange={(e) => handleRatingsChange('count', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                    {currentSlide === slides.length - 1 ? (
                        <div className="mt-4">
                            {/* Show all data entered */}
                            <h3 className="text-lg font-bold mb-2">Data Entered:</h3>
                            <p>Name: {name}</p>
                            <p>Description: {description}</p>
                            <p>Category: {category}</p>
                            <p>Brand: {brand}</p>
                            <p>Price: {price}</p>
                            <p>Variants:</p>
                            <ul>
                                {variants.map((variant, index) => (
                                    <li key={index}>
                                        Option: {variant.option}, Values: {variant.values.join(', ')}, Availability: {variant.availability.join(', ')}
                                    </li>
                                ))}
                            </ul>
                            <p>Images:</p>
                            <ul>
                                {Object.keys(images).map((key) => (
                                    <li key={key}>
                                        {key}: {images[key]}
                                    </li>
                                ))}
                            </ul>
                            <p>Tags: {tags.join(', ')}</p>
                            <p>Specifications:</p>
                            <ul>
                                {Object.keys(specifications).map((key) => (
                                    <li key={key}>
                                        {key}: {specifications[key].join(', ')}
                                    </li>
                                ))}
                            </ul>
                            <p>Ratings: Average: {ratings.average}, Count: {ratings.count}</p>
                            {/* Submit button */}
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
};

export default Sell;
