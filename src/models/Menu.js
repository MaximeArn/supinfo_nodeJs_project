import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    unique: true,
  },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
