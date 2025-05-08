import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ response: "Email already in use" });
    }

    const newUser = new User({ username, email, password });
    const data = await newUser.save();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ response: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ response: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email, password, role } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { email, password, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }
    return res.status(200).json({ response: "User desactivated", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: "Internal server error" });
  }
}
