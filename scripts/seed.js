// scripts/seed.js
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";

import User from "../src/models/User.js";
import Restaurant from "../src/models/Restaurant.js";
import Menu from "../src/models/Menu.js";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Reset all
    await Promise.all([
      User.deleteMany(),
      Restaurant.deleteMany(),
      Menu.deleteMany(),
    ]);
    console.log("🧹 Collections cleared");

    // Users
    const password = await bcrypt.hash("password123", 10);
    const users = await User.insertMany([
      {
        username: "admin",
        email: "admin@example.com",
        password,
        role: "admin",
      },
      { username: "john", email: "john@example.com", password },
    ]);
    console.log("👤 Users created");

    // Restaurants
    const restaurants = await Restaurant.insertMany([
      {
        name: "Pizza Palace",
        adress: "123 Main St",
        phone: "123-456-7890",
        opening_hours: "10:00-22:00",
      },
      {
        name: "Sushi World",
        adress: "456 Ocean Ave",
        phone: "987-654-3210",
        opening_hours: "12:00-23:00",
      },
      {
        name: "Burger Town",
        adress: "789 Grill Rd",
        phone: "555-111-2222",
        opening_hours: "11:00-21:00",
      },
      {
        name: "Taco Fiesta",
        adress: "321 Spice Blvd",
        phone: "444-333-2222",
        opening_hours: "10:30-22:30",
      },
    ]);
    console.log("🍴 Restaurants created");

    // Menus
    await Menu.insertMany([
      {
        restaurant_id: restaurants[0]._id,
        name: "Margherita",
        description: "Classic tomato & cheese",
        price: 8.5,
        category: "Pizza",
      },
      {
        restaurant_id: restaurants[0]._id,
        name: "Pepperoni",
        description: "Tomato, cheese & pepperoni",
        price: 9.5,
        category: "Pizza",
      },
      {
        restaurant_id: restaurants[1]._id,
        name: "Salmon Roll",
        description: "Fresh salmon & rice",
        price: 12.0,
        category: "Sushi",
      },
      {
        restaurant_id: restaurants[1]._id,
        name: "Tuna Roll",
        description: "Tuna, rice & seaweed",
        price: 11.5,
        category: "Sushi",
      },
      {
        restaurant_id: restaurants[2]._id,
        name: "Cheeseburger",
        description: "Beef patty with cheese",
        price: 7.0,
        category: "Burger",
      },
      {
        restaurant_id: restaurants[2]._id,
        name: "Double Bacon Burger",
        description: "Beef, bacon & cheese",
        price: 9.0,
        category: "Burger",
      },
      {
        restaurant_id: restaurants[3]._id,
        name: "Beef Taco",
        description: "Spicy beef taco with cheese",
        price: 3.5,
        category: "Taco",
      },
      {
        restaurant_id: restaurants[3]._id,
        name: "Veggie Taco",
        description: "Grilled veggies & guacamole",
        price: 3.0,
        category: "Taco",
      },
    ]);
    console.log("📋 Menus created");

    console.log("✅ DB seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
