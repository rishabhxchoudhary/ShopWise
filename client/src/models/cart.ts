import { Schema, Document, model, models, Model } from "mongoose";

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

interface ICart extends Document {
  items: CartProduct[];
}

const CartSchema: Schema = new Schema(
  {
    items: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

export default (models.Cart as Model<ICart>) ||
  model<ICart>("Cart", CartSchema);
