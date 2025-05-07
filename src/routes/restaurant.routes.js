import { Router } from "express";
import {
  createRestaurant,
  searchRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurants.controller.js";

const router = Router();

router.post("/", createRestaurant);
router.post("/search", searchRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
