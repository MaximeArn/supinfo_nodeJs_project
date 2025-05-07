import { Router } from "express";
import { hashPassword } from "../middlewares/hashPassword.js";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", hashPassword, registerUser);
router.put("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", hashPassword, updateUser);
router.delete("/:id", deleteUser);

export default router;
