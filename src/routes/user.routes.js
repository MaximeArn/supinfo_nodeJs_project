import { Router } from "express";
// controllers
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
//middlewares
import verifyToken from "../middlewares/verifyToken.js";
import hashPassword from "../middlewares/hashPassword.js";

const router = Router();

router.post("/register", hashPassword, registerUser);
router.post("/login", loginUser);

router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, hashPassword, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
