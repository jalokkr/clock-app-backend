import { Router } from "express";
const router = Router();
import {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
  approveOrderHandler,
  rejectOrderHandler,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

router.post("/", authenticateToken, createOrderHandler);
router.get(
  "/",
  authenticateToken,
  checkRole(["admin", "user"]),
  getAllOrdersHandler
);
router.get("/:orderId", authenticateToken, getOrderHandler);
router.put(
  "/:orderId",
  authenticateToken,
  checkRole(["admin"]),
  updateOrderHandler
);
router.delete(
  "/:orderId",
  authenticateToken,
  checkRole(["admin"]),
  deleteOrderHandler
);
router.post(
  "/:orderId/approve",
  authenticateToken,
  checkRole(["admin"]),
  approveOrderHandler
);
router.post(
  "/:orderId/reject",
  authenticateToken,
  checkRole(["admin"]),
  rejectOrderHandler
);

export default router;
