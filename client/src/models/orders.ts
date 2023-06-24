import { Schema, Document, model, models, Model } from "mongoose";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  Address: Object;
}

interface IOrder extends Document {
  orderId: number;
  orderDate: Date;
  status: string;
  items: OrderItem[];
  sessionId: string;
}

const OrderSchema: Schema = new Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "On the way",
    },
    items: {
      type: [Object],
      default: [],
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    Address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default (models.Orders as Model<IOrder>) ||
  model<IOrder>("Orders", OrderSchema);
