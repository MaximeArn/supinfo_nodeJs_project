import Joi from "joi";

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(/\d/, "at least one number").required(),
  role: Joi.string().valid("user", "admin").optional(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).pattern(/\d/, "at least one number").optional(),
  role: Joi.string().valid("user", "admin").optional(),
});
