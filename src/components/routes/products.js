import { Router } from "express";
const router = Router();
import {
  createProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

router.post("/", authenticateToken, createProductHandler);
router.get("/", authenticateToken, getAllProductsHandler);
router.get("/:productId", authenticateToken, getProductHandler);
router.put("/:productId", authenticateToken, checkRole(["admin"]), updateProductHandler);
router.delete("/:productId", authenticateToken, checkRole(["admin"]), deleteProductHandler);

export default router;
