import { Router } from "express";
// controllers
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurants.controller.js";
// middlewares
import validateObjectId from "../middlewares/validateObjectId.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import validateBody from "../middlewares/validateBody.js";
// validators
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validator.js";

const router = Router();

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by restaurant name (partial match)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Comma-separated fields to sort by (prefix with - for descending)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of results
 *     responses:
 *       200:
 *         description: List of restaurants
 */
router.get("/", getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant found
 *       404:
 *         description: Restaurant not found
 */
router.get("/:id", validateObjectId, getRestaurantById);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, adress, phone, opening_hours]
 *             properties:
 *               name:
 *                 type: string
 *               adress:
 *                 type: string
 *               phone:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  verifyToken,
  checkIsAdmin,
  validateBody(createRestaurantSchema),
  createRestaurant
);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update a restaurant
 *     tags: [Restaurants]
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
 *               adress:
 *                 type: string
 *               phone:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant updated
 *       404:
 *         description: Restaurant not found
 *       403:
 *         description: Access denied
 */
router.put(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  validateBody(updateRestaurantSchema),
  updateRestaurant
);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Restaurants]
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
 *         description: Restaurant deleted
 *       404:
 *         description: Restaurant not found
 *       403:
 *         description: Access denied
 */
router.delete(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  deleteRestaurant
);

export default router;
