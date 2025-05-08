import { jest } from "@jest/globals";
import canAccessUser from "../../middlewares/canAccessUser.js";

describe("Middleware: canAccessUser", () => {
  let req, res, next;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should allow if user is admin", () => {
    req = {
      userRole: "admin",
      userId: "123",
      params: { id: "456" },
    };
    canAccessUser(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should allow if user accesses their own resource", () => {
    req = {
      userRole: "user",
      userId: "123",
      params: { id: "123" },
    };
    canAccessUser(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should deny access if user is neither admin nor self", () => {
    req = {
      userRole: "user",
      userId: "123",
      params: { id: "789" },
    };
    canAccessUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ response: "Access denied" });
  });
});
