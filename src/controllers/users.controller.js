import User from "../models/User.js";

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    const data = await user.save();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email, password });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "Email or password incorrect" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { email, password, role } = req.body;
    const data = await User.findByIdAndUpdate(
      id,
      { email, password, role },
      { new: true }
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ response: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({ response: "User desactivated", user: data });
    } else {
      res.status(400).json({ response: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
  }
}
