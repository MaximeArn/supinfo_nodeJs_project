import { updateUserSchema } from "../../../validators/user.validator.js";
import { describe, expect, it } from "@jest/globals";

describe("update user request body validation", () => {
  it("should pass with valid fields", () => {
    const result = updateUserSchema.validate({
      email: "max@example.com",
      password: "Test1234",
      role: "admin",
    });
    expect(result.error).toBeUndefined();
  });

  it("should pass with partial fields", () => {
    const result = updateUserSchema.validate({ email: "max@example.com" });
    expect(result.error).toBeUndefined();
  });

  it("should fail with invalid email", () => {
    const result = updateUserSchema.validate({
      email: "notanemail",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if password lacks a number", () => {
    const result = updateUserSchema.validate({
      password: "NoNumber",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if role is invalid", () => {
    const result = updateUserSchema.validate({
      role: "manager",
    });
    expect(result.error).toBeDefined();
  });
});
