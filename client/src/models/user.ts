import { Schema, Document, model, models, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  addresses: object[];
  isAdmin: boolean;
  cart: string;
  orders: number[];
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    addresses: {
      type: [Object],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: String,
      required: true,
    },
    orders: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default (models.User as Model<IUser>) ||
  model<IUser>("User", UserSchema);
