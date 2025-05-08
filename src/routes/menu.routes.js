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
//validators
import {
  createMenuSchema,
  updateMenuSchema,
} from "../validators/menu.validator.js";

const router = Router();

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menus]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Comma-separated fields to sort by (use - for descending)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of results
 *     responses:
 *       200:
 *         description: List of menus
 */
router.get("/", getAllMenus);

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu found
 *       404:
 *         description: Menu not found
 */
router.get("/:id", validateObjectId, getMenuById);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [restaurant_id, name, description, price, category]
 *             properties:
 *               restaurant_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  verifyToken,
  checkIsAdmin,
  validateBody(createMenuSchema),
  createMenu
);

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Update a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu updated
 *       404:
 *         description: Menu not found
 *       403:
 *         description: Access denied
 */
router.put(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  validateBody(updateMenuSchema),
  updateMenu
);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Delete a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu deleted
 *       404:
 *         description: Menu not found
 *       403:
 *         description: Access denied
 */
router.delete("/:id", verifyToken, checkIsAdmin, validateObjectId, deleteMenu);

export default router;
