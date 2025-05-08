import mongoose from "mongoose";

export default function validateObjectId({ params: { id } }, res, next) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ response: "Invalid ID format" });
  }

  next();
}
