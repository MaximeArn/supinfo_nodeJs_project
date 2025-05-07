import Restaurant from "../models/Restaurant.js";

export async function createRestaurant(req, res) {
  try {
    const { name, adress, phone, opening_hours } = req.body;
    const restaurant = new Restaurant({ name, adress, phone, opening_hours });
    const data = await restaurant.save();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function searchRestaurant(req, res) {
  try {
    const { name } = req.body;
    const data = await Restaurant.findOne({ name });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Restaurant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function getAllRestaurants(req, res) {
  try {
    const sortFields = req.query.sort ? req.query.sort.split(",") : [];
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = Restaurant.find();

    if (sortFields.length > 0) {
      const sortOptions = {};
      sortFields.forEach((field) => {
        let sortOrder = 1;
        if (field.startsWith("-")) {
          sortOrder = -1;
          field = field.substring(1);
        }
        if (["name", "adress", "phone", "opening_hours"].includes(field)) {
          sortOptions[field] = sortOrder;
        }
      });
      query = query.sort(sortOptions);
    }

    if (limit > 0) {
      query = query.limit(limit);
    }

    const data = await query.exec();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const id = req.params.id;
    const data = await Restaurant.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Restaurant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateRestaurant(req, res) {
  try {
    const id = req.params.id;
    const { name, adress, phone, opening_hours } = req.body;
    const data = await Restaurant.findByIdAndUpdate(
      id,
      { name, adress, phone, opening_hours },
      { new: true }
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Restaurant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const id = req.params.id;
    const data = await Restaurant.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Restaurant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}
