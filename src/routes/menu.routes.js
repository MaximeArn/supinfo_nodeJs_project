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
import validateObjectId from "../middlewares/validateObjectId.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import validateBody from "../middlewares/validateBody.js";
import {
  createMenuSchema,
  updateMenuSchema,
} from "../validators/menu.validator.js";

const router = Router();

router.get("/", getAllMenus);
router.get("/:id", validateObjectId, getMenuById);

router.post(
  "/",
  verifyToken,
  checkIsAdmin,
  validateBody(createMenuSchema),
  createMenu
);
router.put(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  validateBody(updateMenuSchema),
  updateMenu
);
router.delete("/:id", verifyToken, checkIsAdmin, validateObjectId, deleteMenu);

export default router;
