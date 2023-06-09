import { Document, Schema, Model, model } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  availability: string;
  variants: {
    option: string;
    values: string[];
    availability: string[];
  }[];
  images: Record<string, string>;
  ratings: {
    average: number;
    count: number;
  };
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
  specifications: {
    dimensions: string;
    weight: string;
    material: string;
  };
  sku: string;
  condition: string;
  upc: string;
  mpn: string;
  gtin: string;
  isbn: string;
  ean: string;
  warranty: string;
  shippingDetails: {
    shippingOptions: {
      option: string;
      cost: number;
      estimatedDelivery: string;
    }[];
  };
  relatedItems: string[];
  tags: string[];
  promotions?: {
    discount: number;
    validUntil: Date;
  };
  metaDescription: string;
}

// Define the Mongoose schema for the Product collection
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  variants: [
    {
      option: { type: String, required: true },
      values: { type: [String], required: true },
      availability: { type: [String], required: true },
    },
  ],
  images: { type: Map, of: String, required: true },
  ratings: {
    average: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  reviews: [
    {
      author: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  specifications: {
    dimensions: { type: String, required: true },
    weight: { type: String, required: true },
    material: { type: String, required: true },
  },
  sku: { type: String, required: true },
  condition: { type: String, required: true },
  upc: { type: String, required: true },
  mpn: { type: String, required: true },
  gtin: { type: String, required: true },
  isbn: { type: String, required: true },
  ean: { type: String, required: true },
  warranty: { type: String, required: true },
  shippingDetails: {
    shippingOptions: [
      {
        option: { type: String, required: true },
        cost: { type: Number, required: true },
        estimatedDelivery: { type: String, required: true },
      },
    ],
  },
  relatedItems: [{ type: String }],
  tags: [{ type: String }],
  promotions: {
    discount: { type: Number },
    validUntil: { type: Date },
  },
  metaDescription: { type: String, required: true },
});

const Product: Model<IProduct> = model<IProduct>("Product", productSchema);

export default Product;
