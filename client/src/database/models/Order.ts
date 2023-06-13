import { Schema, Document, model, models, Model } from "mongoose";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  orderId: number;
  orderDate: Date;
  status: string;
  items: OrderItem[];
}

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Pending",
    },
    items: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

export default (models.Order as Model<IOrder>) ||
  model<IOrder>("User", OrderSchema);
