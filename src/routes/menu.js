import express from "express";
import Menu from "../models/Menu.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { restaurant_id, name, description, price, category } = req.body;
  const menu = new Menu({ restaurant_id, name, description, price, category });

  menu
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.post("/search", (req, res) => {
  const { name } = req.body;
  Menu.findOne({ name: name })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "Menu not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.get("/", async (req, res) => {
  const sortFields = req.query.sort ? req.query.sort.split(",") : [];
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  let query = Menu.find();

  if (sortFields.length > 0) {
    const sortOptions = [];

    sortFields.forEach((field) => {
      let sortOrder = 1;

      if (field.startsWith("-")) {
        sortOrder = -1;
        field = field.substring(1);
      }

      if (
        ["restaurant_id", "name", "description", "price", "category"].includes(
          field
        )
      ) {
        sortOptions.push([field, sortOrder]);
      }
    });

    if (sortOptions.length > 0) {
      query = query.sort(sortOptions);
    }
  }

  if (limit > 0) {
    query = query.limit(limit);
  }

  try {
    const data = await query.exec();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "Menu not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, price, category } = req.body;
  Restaurant.findByIdAndUpdate(
    id,
    { name, description, price, category },
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "Menu not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "Menu not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

export default router;
