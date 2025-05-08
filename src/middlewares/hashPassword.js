import { hash } from "bcrypt";

export default async function hashPassword(req, res, next) {
  if (req.body.password) {
    try {
      const saltRounds = 10;
      req.body.password = await hash(req.body.password, saltRounds);
    } catch (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ response: "Internal server error" });
    }
  }
  next();
}
