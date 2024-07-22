import { Schema, model, Types } from "mongoose";

const stockSchema = new Schema({
  name: {
    type: String,
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  usedQuantity: {
    type: Number,
    default: 0,
  },
  unusedQuantity: {
    type: Number,
    default: 0,
  },
});

export default model("Stock", stockSchema);
