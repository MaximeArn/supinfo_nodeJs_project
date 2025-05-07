import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  adress: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  opening_hours: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
