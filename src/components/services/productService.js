import Product from "../models/productModel.js";

export async function createProduct(productData) {
  const product = new Product(productData);
  return await product.save();
}

export async function getAllProducts() {
  const products = await Product.find();

  const totalProductCategory = products.length;
  const totalProductQuantity = products.reduce(
    (acc, product) => acc + Number(product.quantity),
    0
  );
  const totalProductQuantityConsumed = products.reduce(
    (acc, product) => acc + Number(product.quantityConsumed || 0),
    0
  );
  const totalProductQuantityRemaining =
    totalProductQuantity - totalProductQuantityConsumed;

  return {
    products,
    metrics: {
      totalProductCategory,
      totalProductQuantity,
      totalProductQuantityConsumed,
      totalProductQuantityRemaining,
    },
  };
}

export async function getProductById(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    return null;
  }

  const totalQuantity = Number(product.quantity);
  const quantityConsumed = Number(product.quantityConsumed || 0);
  const quantityRemaining = totalQuantity - quantityConsumed;

  return {
    product,
    metrics: {
      totalQuantity,
      quantityConsumed,
      quantityRemaining,
    },
  };
}

export async function updateProductById(productId, productData) {
  return await Product.findByIdAndUpdate(productId, productData, { new: true });
}

export async function deleteProductById(productId) {
  return await Product.findByIdAndDelete(productId);
}
