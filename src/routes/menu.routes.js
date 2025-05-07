import { Router } from "express";
import {
  createMenu,
  searchMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menus.controller.js";

const router = Router();

router.post("/", createMenu);
router.post("/search", searchMenu);
router.get("/", getAllMenus);
router.get("/:id", getMenuById);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
