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

const router = Router();

router.get("/", getAllRestaurants);
router.get("/:id", validateObjectId, getRestaurantById);

router.post("/", verifyToken, createRestaurant);
router.put("/:id", verifyToken, validateObjectId, updateRestaurant);
router.delete("/:id", verifyToken, validateObjectId, deleteRestaurant);

export default router;
