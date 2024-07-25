import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  code: {
    type: String,
  },
  category: {
    type: String,
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
});

export default model("Product", productSchema);
