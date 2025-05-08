import Restaurant from "../models/Restaurant.js";

export async function createRestaurant(req, res) {
  try {
    const { name, adress, phone, opening_hours } = req.body;
    const restaurant = new Restaurant({ name, adress, phone, opening_hours });
    const data = await restaurant.save();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function getAllRestaurants(req, res) {
  try {
    const { name, sort, limit } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    let dbQuery = Restaurant.find(query);

    if (sort) {
      const sortFields = sort.split(",").reduce((acc, field) => {
        const direction = field.startsWith("-") ? -1 : 1;
        const key = field.replace(/^-/, "");
        acc[key] = direction;
        return acc;
      }, {});
      dbQuery = dbQuery.sort(sortFields);
    }

    const parsedLimit = parseInt(limit);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      dbQuery = dbQuery.limit(parsedLimit);
    }

    const data = await dbQuery.exec();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ response: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateRestaurant(req, res) {
  try {
    const { id } = req.params;
    const { name, adress, phone, opening_hours } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, adress, phone, opening_hours },
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ response: "Restaurant not found" });
    }
    return res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({ response: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}
