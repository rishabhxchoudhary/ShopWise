// This file sets up a reusable connection to the MongoDB database using Mongoose.
import mongoose, { Connection } from "mongoose";
import Product from "./models/product";
// import Product from "./models/Product";

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
export const product = Product;
export default connectToDatabase;
