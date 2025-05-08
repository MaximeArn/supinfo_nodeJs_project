import bcrypt from "bcrypt";
import User from "../models/User.js";

import createToken from "../utils/createToken.js";

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ response: "Email already in use" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ response: "Username already in use" });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    const token = createToken(savedUser);

    return res.status(200).json({ token });
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

    const token = createToken(user);
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
