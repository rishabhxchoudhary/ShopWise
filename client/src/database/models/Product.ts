import { Document, Schema, Model, model } from "mongoose";
interface ProductVariant {
  option: string;
  values: string[];
  availability: string[];
}

interface ProductImages {
  [key: string]: string;
}

interface ProductRating {
  average: number;
  count: number;
}

interface ProductReview {
  author: string;
  rating: number;
  comment: string;
}

interface ProductSpecifications {
  [key: string]: string[];
}

interface Product {
  _id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  variants: ProductVariant[];
  images: ProductImages;
  ratings: ProductRating;
  reviews: ProductReview[];
  specifications: ProductSpecifications;
  tags: string[];
  metaDescription: string;
}

interface IProduct extends Document {
  _id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  variants: ProductVariant[];
  images: ProductImages;
  ratings: ProductRating;
  reviews: ProductReview[];
  specifications: ProductSpecifications;
  tags: string[];
  metaDescription: string;
}

const productSchema: Schema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variants: {
    type: [Object],
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  ratings: {
    type: Object,
    default: {},
  },
  reviews: {
    type: [Object],
    default: [],
  },
  specifications: {
    type: Object,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  metaDescription: {
    type: String,
    default: "",
  },
});

const Product: Model<IProduct> = model<IProduct>("Product", productSchema);

export default Product;
