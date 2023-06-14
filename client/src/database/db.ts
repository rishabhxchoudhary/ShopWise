// This file sets up a reusable connection to the MongoDB database using Mongoose.
import mongoose, { Connection } from "mongoose";

const MONGODB_URI = "mongodb+srv://root:root@cluster0.smibz3t.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: { conn: Connection | null; promise: Promise<Connection> | null } = {
  conn: null,
  promise: null,
};

async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const options: ConnectOptions = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// const db = connectToDatabase();
// Product.find();
export default connectToDatabase;

import { Document, Schema, Model, model, models } from "mongoose";
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

interface IProduct extends Document {
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

export const product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>("Product", productSchema);
