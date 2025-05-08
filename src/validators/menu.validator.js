import Joi from "joi";

export const createMenuSchema = Joi.object({
  restaurant_id: Joi.string().required(),
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(300).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(2).max(50).required(),
});

export const updateMenuSchema = createMenuSchema;
