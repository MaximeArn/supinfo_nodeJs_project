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
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function getAllMenus(req, res) {
  try {
    const { sort, limit } = req.query;
    const sortFields = sort ? sort.split(",") : [];
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

    const parsedLimit = parseInt(limit);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      query = query.limit(parsedLimit);
    }

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function getMenuById(req, res) {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ response: "Menu not found" });
    }
    return res.status(200).json(menu);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );
    if (!menu) {
      return res.status(404).json({ response: "Menu not found" });
    }
    return res.status(200).json(menu);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteMenu(req, res) {
  try {
    const { id } = req.params;
    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      return res.status(404).json({ response: "Menu not found" });
    }
    return res.status(200).json(menu);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}
