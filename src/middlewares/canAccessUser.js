export default function canAccessUser(req, res, next) {
  const isAdmin = req.userRole === "admin";
  const isSelf = req.userId === req.params.id;

  if (!isAdmin && !isSelf) {
    return res.status(403).json({ response: "Access denied" });
  }

  next();
}
