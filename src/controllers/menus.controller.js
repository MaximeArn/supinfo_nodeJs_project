import Menu from "../models/Menu.js";

export async function createMenu(req, res) {
  try {
    const { restaurant_id, name, description, price, category } = req.body;
    const menu = new Menu({
      restaurant_id,
      name,
      description,
      price,
      category,
    });
    const data = await menu.save();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function searchMenu(req, res) {
  try {
    const { name } = req.body;
    const data = await Menu.findOne({ name });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Menu not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function getAllMenus(req, res) {
  try {
    const sortFields = req.query.sort ? req.query.sort.split(",") : [];
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = Menu.find();

    if (sortFields.length > 0) {
      const sortOptions = {};
      sortFields.forEach((field) => {
        let sortOrder = 1;
        if (field.startsWith("-")) {
          sortOrder = -1;
          field = field.substring(1);
        }
        if (
          [
            "restaurant_id",
            "name",
            "description",
            "price",
            "category",
          ].includes(field)
        ) {
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

export async function getMenuById(req, res) {
  try {
    const id = req.params.id;
    const data = await Menu.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Menu not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateMenu(req, res) {
  try {
    const id = req.params.id;
    const { name, description, price, category } = req.body;
    const data = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Menu not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteMenu(req, res) {
  try {
    const id = req.params.id;
    const data = await Menu.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Menu not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}
