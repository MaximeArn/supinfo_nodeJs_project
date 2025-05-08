export default function checkIsAdmin(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ response: "Access denied: Admins only" });
  }
  next();
}
