"use client";
import { useState } from "react";
import ProductPageCss from "./ProductPage.module.css";
import ImageCarousel from "./ImageCarousal";
import StarRating from "./Star";
import Variants from "./Variant";
import Quantity from "./Quantity";
import CartActions from "./CartAction";
import Specifications from "./Specifications";
import Reviews from "./Reviews";
import { useDispatch } from "react-redux";
import { start, stop } from "@/redux/features/loading/loadingSlice";
import { useCookies } from "react-cookie";

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
  price: number;
  name: string;
  description: string;
  variants: Variant[];
  images: ImageUrls;
  ratings: Rating;
  reviews: Review[];
  specifications: Specifications;
  tags: string[];
};

const ProductPage = ({
  id,
  name,
  price,
  description,
  variants,
  images,
  ratings,
  reviews,
  specifications,
  tags,
}: Prop) => {
  const [selection, setSelection] = useState<VariantSelection>({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["uuid"]);
  const uuid = cookies.uuid;

  const AddtoCart = async () => {
    dispatch(start());
    const cur_product: CartProduct = {
      _id: id || "",
      name: name || "",
      image: images[Object.keys(images)[0]] || "",
      variant: [],
      quantity: quantity,
      price: price || 0,
    };
    Object.keys(selection).forEach((option) => {
      cur_product.variant.push({
        option,
        value: selection[option],
      });
    });
    // Push cur_product to the backend api usng fetch
    await fetch(`/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: cur_product,
        uuid: uuid,
      }),
    });
    dispatch(stop());
  };

  function BuyNow() {
    console.log("Buy now clicked");
  }

  // const { name, description, variants, images, ratings, reviews, specifications, tags } = product;

  return (
    <div className={ProductPageCss.main}>
      <div className={`p-4  flex gap-5 flex-wrap`}>
        Tags:{" "}
        {tags.map((tag, index) => {
          return (
            <span className={`${ProductPageCss.tags}`} key={index}>
              {tag}{" "}
            </span>
          );
        })}
      </div>
      <div
        className={`${ProductPageCss.content} flex-col md:flex-row md:gap-10 overflow-scroll`}
      >
        <div className={`${ProductPageCss.images} min-h-[300px]`}>
          <ImageCarousel images={images} />
        </div>
        <div className={`${ProductPageCss.info} pt-28`}>
          <div className="flex flex-col gap-2">
            <div className={ProductPageCss.name}>{name}</div>
            <div className={ProductPageCss.description}>{description}</div>
            <div className={ProductPageCss.rating}>
              <StarRating rating={ratings.average} /> {ratings.count} reviews
            </div>
          </div>
          <div className={ProductPageCss.Price}>
            <div className={`${ProductPageCss.price} text-2xl font-semibold`}>
              Price: $ {price}
            </div>
          </div>
          <div className={ProductPageCss.variants}>
            <Variants
              variants={variants}
              selection={selection}
              setSelection={setSelection}
            />
          </div>
          <div className={ProductPageCss.Quantity}>
            <div className={ProductPageCss.quantity}>
              <Quantity quantity={quantity} onQuantityChange={setQuantity} />
            </div>
          </div>
          <div className={ProductPageCss.AddToCart}>
            <CartActions
              totalAmount={Math.round((quantity * price * 1000) / 1000)}
              onAddToCart={AddtoCart}
              onBuy={BuyNow}
            />
          </div>
        </div>
      </div>
      <Specifications specifications={specifications} />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;
