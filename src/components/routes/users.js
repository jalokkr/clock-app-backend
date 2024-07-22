import { Router } from "express";
const router = Router();
import {
  getAllUsersList,
  getUser,
  createUserHandler,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";
import { loginUser } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

router.get("/", authenticateToken, checkRole(["admin"]), getAllUsersList);
router.get("/:userId", authenticateToken, checkRole(["admin"]), getUser);
router.post("/", createUserHandler);
router.delete("/:userId", authenticateToken, checkRole(["admin"]), deleteUser);
router.put("/:userId", authenticateToken, checkRole(["admin"]), updateUser);
router.post("/login", loginUser);

export default router;
