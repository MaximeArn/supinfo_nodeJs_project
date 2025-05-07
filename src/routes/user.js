import express from "express";
import User from "../../models/User.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });

  user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "Email or password incorrect" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { email, password, role } = req.body;
  User.findByIdAndUpdate(id, { email, password, role }, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ response: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.status(200).json({ response: "User desactivated", user: data });
      } else {
        res.status(400).json({ response: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ response: "Internal server error" });
    });
});

export default router;
