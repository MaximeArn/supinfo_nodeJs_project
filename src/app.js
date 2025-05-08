// External imports
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

// Database connection
import { connectToDatabase } from "./config/database.js";

// Routes
import userRoute from "./routes/user.routes.js";
import restaurantRoute from "./routes/restaurant.routes.js";
import menuRoute from "./routes/menu.routes.js";

await connectToDatabase();

const app = express();

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/users", userRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/menus", menuRoute);

app.use((req, res) => {
  res.status(404).json({ message: `Not Found` });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
