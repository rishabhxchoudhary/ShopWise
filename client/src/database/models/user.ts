import { Schema, Document, model, models, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  addresses: string[];
  isAdmin: boolean;
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
    },
    addresses: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default (models.User as Model<IUser>) ||
  model<IUser>("User", UserSchema);
