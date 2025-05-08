import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import hashPassword from "../../middlewares/hashPassword.js";

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
