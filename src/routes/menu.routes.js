import { Router } from "express";
// controllers
import {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menus.controller.js";
// middlewares
import verifyToken from "../middlewares/verifyToken.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = Router();

router.get("/", getAllMenus);
router.get("/:id", validateObjectId, getMenuById);

router.post("/", verifyToken, validateObjectId, createMenu);
router.put("/:id", verifyToken, validateObjectId, updateMenu);
router.delete("/:id", verifyToken, validateObjectId, deleteMenu);

export default router;
