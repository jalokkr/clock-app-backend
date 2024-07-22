import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  name: {
    type: String,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Types.ObjectId,
    ref: "Product",
  },
  productCode: {
    type: Number,
    unique: true,
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
  },
  comment: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  log: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default model("Order", orderSchema);
