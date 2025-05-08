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

router.get("/", getAllRestaurants);
router.get("/:id", validateObjectId, getRestaurantById);

router.post(
  "/",
  verifyToken,
  checkIsAdmin,
  validateBody(createRestaurantSchema),
  createRestaurant
);
router.put(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  validateBody(updateRestaurantSchema),
  updateRestaurant
);
router.delete(
  "/:id",
  verifyToken,
  checkIsAdmin,
  validateObjectId,
  deleteRestaurant
);

export default router;
