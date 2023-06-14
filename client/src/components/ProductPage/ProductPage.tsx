"use client"
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
  _id: string;
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

interface CartProduct {
  _id: string;
  name: string;
  image: string;
  variant: {
    option: string;
    value: string;
  }[];
  price: number;
  quantity: number;
}

type VariantSelection = {
  [option: string]: string;
};

type Prop = {
  id: string;
}

const ProductPage = ({id}: Prop) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selection, setSelection] = useState<VariantSelection>({});
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
                id: id
            })});
        const data = await response.json();
        setProduct(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      dispatch(stop());
    };
    fetchProduct();

  }, []);

  const AddtoCart = () => {
    dispatch(start());
    const storedCartData = localStorage.getItem('cart');
    let cartData: CartProduct[] = [];
    if (storedCartData) {
      cartData = JSON.parse(storedCartData);
    }

    const cur_product: CartProduct = {
      _id: product?._id || "",
      name: product?.name || "",
      image: product?.images[Object.keys(product?.images)[0]] || "",
      variant: [],
      quantity: quantity,
      price: product?.price || 0,
    }
    Object.keys(selection).forEach((option) => {
      cur_product.variant.push({
        option,
        value: selection[option],
      });
    });

    const existingItemIndex = cartData.findIndex(
      (item) => item._id === cur_product?._id && isEqual(item.variant, cur_product.variant )
    );
  
    if (existingItemIndex !== -1) {
      // Item with the same variant already exists, increase the quantity
      cartData[existingItemIndex].quantity += cur_product.quantity;
    } else {
      // Item with the same variant doesn't exist, add the new product to the cart
      cartData.push(cur_product);
    }
  
    // Save the updated cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));
    alert("Added to cart")
    dispatch(stop());
  };
  
  const isEqual = (arr1: { option: string; value: string }[], arr2: { option: string; value: string }[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].option !== arr2[i].option || arr1[i].value !== arr2[i].value) {
        return false;
      }
    }
    return true;
  };
  

  function BuyNow(){
    console.log("Buy now clicked")
  }

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
              <Variants variants={variants} selection={selection} setSelection={setSelection}/>
            </div>
            <div className={ProductPageCss.Quantity}>
                <div className={ProductPageCss.quantity}>
                  <Quantity quantity={quantity} onQuantityChange={setQuantity}  />
                </div>
            </div>
            <div className={ProductPageCss.AddToCart}>
                <CartActions totalAmount={Math.round((quantity * product.price * 1000)/1000)} onAddToCart={AddtoCart} onBuy={BuyNow} />
            </div>
        </div>
    </div>
    <Specifications specifications={specifications} />
    <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;
