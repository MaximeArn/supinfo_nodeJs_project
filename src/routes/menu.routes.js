import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createMenu,
  searchMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menus.controller.js";

const router = Router();

router.post("/search", searchMenu);
router.get("/", getAllMenus);
router.get("/:id", getMenuById);

router.post("/", verifyToken, createMenu);
router.put("/:id", verifyToken, updateMenu);
router.delete("/:id", verifyToken, deleteMenu);

export default router;
