import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductPageCss from './ProductPage.module.css'
import ImageCarousel from './ImageCarousal';
import StarRating from './Star';

interface Variant {
  option: string;
  values: string[];
  availability: string[];
}

interface ImageUrls {
  [key: string]: string;
}

interface Rating {
  average: number;
  count: number;
}

interface Review {
  author: string;
  rating: number;
  comment: string;
}

interface Specifications {
  [key: string]: string[];
}

interface ShippingOption {
  option: string;
  cost: number;
  estimatedDelivery: string;
}

interface Product {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  variants: Variant[];
  images: ImageUrls;
  ratings: Rating;
  reviews: Review[];
  specifications: Specifications;
  warranty: string;
  shippingDetails: {
    shippingOptions: ShippingOption[];
  };
  tags: string[];
  metaDescription: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const response = await fetch(`/api/product/getProductDetails`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "1232"
            })});
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, variants, images, ratings, reviews, specifications, tags } = product;
  console.log(ratings);

  return (
    <>
    <div className={ProductPageCss.content}>
        <div className={`${ProductPageCss.images}`}>
            <ImageCarousel images={images} />
        </div>
        <div className={ProductPageCss.info}>
            <div className={ProductPageCss.name}>{name}</div>
            <div className={ProductPageCss.description}>{description}</div>
            <div className={ProductPageCss.rating}>
                <StarRating rating={ratings.average} /> {ratings.count} reviews
            </div>
            <div className={ProductPageCss.Price}>
                <div className={ProductPageCss.price}>$ {product.price}</div>
            </div>
            <div className={ProductPageCss.variants}>
            </div>
            <div className={ProductPageCss.Quantity}>
                <div className={ProductPageCss.quantity}>Quantity</div>
            </div>
            <div className={ProductPageCss.AddToCart}>
                <button className={ProductPageCss.AddToCartButton}>Add to Cart</button>
            </div>
        </div>
    </div>

    <div className="hidden">
      <h1>{name}</h1>
      <p>{description}</p>

      <h2>Variants</h2>
      <ul>
        {variants.map((variant, index) => (
          <li key={index}>
            {variant.option}: {variant.values.join(', ')}
          </li>
        ))}
      </ul>

      <h2>Images</h2>
      <div className="image-carousel">
        {Object.entries(images).map(([color, imageUrl]) => (
          <div key={color} className="image-wrapper">
            <Image src={imageUrl} alt={color} width={400} height={300} />
            <p>{color}</p>
          </div>
        ))}
      </div>

      <h2>Ratings</h2>
      <p>Average: {ratings.average}</p>
      <p>Count: {ratings.count}</p>

      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Author: {review.author}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>

      <h2>Specifications</h2>
      <ul>
        {Object.entries(specifications).map(([specKey, specValues]) => (
          <li key={specKey}>
            <p>{specKey}</p>
            <ul>
              {specValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Tags</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>

      <style jsx>{`
        .image-carousel {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 10px;
        }
      `}</style>
    </div>
    </>
  );
};

export default ProductPage;
