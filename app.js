import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.js";
import restaurantRoute from "./routes/restaurant.js";
import menuRoute from "./routes/menu.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { method, body } = req;
  const cat = body.category;
  const validCategories = ["salad", "pizza", "sandwich"];

  if (method === "POST" && validCategories.includes(cat)) {
    next();
  } else {
    res.status(400).json({ message: "400 - Bad Request" });
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/food/users", userRoute);
app.use("/api/food/restaurants", restaurantRoute);
app.use("/api/food/menus", menuRoute);

app.use((req, res) => {
  res.status(404).json({ message: `API not found at ${req.url}` });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
