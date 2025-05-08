import { jest } from "@jest/globals";
import requireAuth from "../../middlewares/verifyToken.js";

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
