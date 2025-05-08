import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createRestaurant,
  searchRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurants.controller.js";

const router = Router();

router.post("/search", searchRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

router.post("/", verifyToken, createRestaurant);
router.put("/:id", verifyToken, updateRestaurant);
router.delete("/:id", verifyToken, deleteRestaurant);

export default router;
