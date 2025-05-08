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
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Internal server error" });
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

    res.status(200).json({ token });
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
