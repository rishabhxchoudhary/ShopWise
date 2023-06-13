import { Schema, Document, model, models, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  addresses: string[];
  isAdmin: boolean;
  cart: {
    _id: number;
    variant: {
      option: string;
      value: string;
    }[];
    quantity: number;
  }[];
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
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: [Object],
      default: [],
    },
    orders: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
