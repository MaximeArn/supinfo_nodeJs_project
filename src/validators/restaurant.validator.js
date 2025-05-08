// validations/restaurant.validation.js
import Joi from "joi";

export const createRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  adress: Joi.string().min(5).max(200).required(),
  phone: Joi.string().min(8).max(20).required(),
  opening_hours: Joi.string().min(5).max(100).required(),
});

export const updateRestaurantSchema = createRestaurantSchema;
