import { useEffect, useState } from 'react';
import ProductPageCss from './ProductPage.module.css'
import ImageCarousel from './ImageCarousal';
import StarRating from './Star';
import Variants from './Variant';
import Quantity from './Quantity';
import CartActions from './CartAction';
import Specifications from './Specifications';
import Reviews from './Reviews';
import { useDispatch } from "react-redux";
import { start, stop } from "@/redux/features/loading/loadingSlice";

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
  const [quantity,setQuantity] = useState(1);
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(start());
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
      dispatch(stop());
    };
    fetchProduct();

  }, []);

  if (!product) {
    return <div className='min-h-[90vh]'></div>
  }
  const { name, description, variants, images, ratings, reviews, specifications, tags } = product;

  return (
    <div className={ProductPageCss.main}>
    <div className={`p-4  flex gap-5 flex-wrap`}>Tags: {tags.map((tag,index)=>{return <span className={`${ProductPageCss.tags}`} key={index}>{tag}{" "}</span>})}</div>
    <div className={`${ProductPageCss.content} flex-col md:flex-row md:gap-10 overflow-scroll`}>
      
        <div className={`${ProductPageCss.images} min-h-[300px]`}>
            <ImageCarousel images={images} />
        </div>
        <div className={`${ProductPageCss.info} pt-28`}>
            <div className='flex flex-col gap-2'>
              <div className={ProductPageCss.name}>{name}</div>
              <div className={ProductPageCss.description}>{description}</div>
              <div className={ProductPageCss.rating}>
                  <StarRating rating={ratings.average} /> {ratings.count} reviews
              </div>
            </div>
            <div className={ProductPageCss.Price}>
                <div className={`${ProductPageCss.price} text-2xl font-semibold`}>Price: $ {product.price}</div>
            </div>
            <div className={ProductPageCss.variants}>
              <Variants variants={variants} />
            </div>
            <div className={ProductPageCss.Quantity}>
                <div className={ProductPageCss.quantity}>
                  <Quantity quantity={quantity} onQuantityChange={setQuantity}  />
                </div>
            </div>
            <div className={ProductPageCss.AddToCart}>
                <CartActions totalAmount={Math.round((quantity * product.price * 1000)/1000)} onAddToCart={() => {}} onBuy={() => {}} />
            </div>
        </div>
    </div>
    <Specifications specifications={specifications} />
    <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;
