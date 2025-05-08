import { jest } from "@jest/globals";
import checkIsAdmin from "../../middlewares/checkIsAdmin.js";

describe("Middleware: checkIsAdmin", () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  it("should reject if user is not admin", () => {
    const req = { userRole: "user" };
    checkIsAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      response: "Access denied: Admins only",
    });
  });

  it("should call next if user is admin", () => {
    const req = { userRole: "admin" };
    checkIsAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
