import { jest } from "@jest/globals";
import requireAuth from "../middlewares/verifyToken.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import hashPassword from "../middlewares/hashPassword.js";
import bcrypt from "bcrypt";

describe("Middleware: requireAuth", () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  it("should reject if no Authorization header", () => {
    const req = { headers: {} };
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should reject if token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalidtoken" } };
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

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

describe("Middleware: hashPassword", () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  it("should hash the password and call next", async () => {
    const req = { body: { password: "Test1234" } };
    await hashPassword(req, res, next);
    expect(req.body.password).not.toBe("Test1234");
    const match = await bcrypt.compare("Test1234", req.body.password);
    expect(match).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  it("should skip hashing if no password", async () => {
    const req = { body: {} };
    await hashPassword(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
