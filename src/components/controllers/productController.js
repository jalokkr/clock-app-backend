import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../services/productService.js";

export async function createProductHandler(req, res) {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllProductsHandler(req, res) {
  try {
    const { products, metrics } = await getAllProducts();
    res.json({ products, metrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductHandler(req, res) {
  try {
    const product = await getProductById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProductHandler(req, res) {
  try {
    const updatedProduct = await updateProductById(
      req.params.productId,
      req.body
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductHandler(req, res) {
  try {
    const deletedProduct = await deleteProductById(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
