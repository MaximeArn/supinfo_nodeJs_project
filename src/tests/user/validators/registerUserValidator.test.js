import { registerUserSchema } from "../../../validators/user.validator";
import { describe, expect, it } from "@jest/globals";

describe("register user request body validation", () => {
  it("should pass with valid data", () => {
    const result = registerUserSchema.validate({
      username: "Max",
      email: "max@example.com",
      password: "Test1234",
    });
    expect(result.error).toBeUndefined();
  });

  it("should fail if email is invalid", () => {
    const result = registerUserSchema.validate({
      username: "Max",
      email: "not-an-email",
      password: "Test1234",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if password has no number", () => {
    const result = registerUserSchema.validate({
      username: "Max",
      email: "max@example.com",
      password: "Password",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if username is too short", () => {
    const result = registerUserSchema.validate({
      username: "M",
      email: "max@example.com",
      password: "Test1234",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if required field is missing", () => {
    const result = registerUserSchema.validate({
      username: "Max",
      password: "Test1234",
    });
    expect(result.error).toBeDefined();
  });
});
