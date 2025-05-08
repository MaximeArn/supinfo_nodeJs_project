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
import validateObjectId from "../middlewares/validateObjectId.js";

const router = Router();

router.post("/register", hashPassword, registerUser);
router.post("/login", loginUser);

router.get("/:id", verifyToken, validateObjectId, getUserById);
router.put("/:id", verifyToken, hashPassword, validateObjectId, updateUser);
router.delete("/:id", verifyToken, validateObjectId, deleteUser);

export default router;
