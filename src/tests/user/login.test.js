import mongoose from "mongoose";
import { jest } from "@jest/globals";
import User from "../../models/User.js";
import { loginUser } from "../../controllers/users.controller.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

describe("loginUser", () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterEach(async () => {
    await mongoose.connection.db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should login successfully and return a token", async () => {
    const hashedPassword = await bcrypt.hash("Test1234", 10);
    await User.create({
      username: "loginuser",
      email: "login@example.com",
      password: hashedPassword,
    });

    req.body = {
      email: "login@example.com",
      password: "Test1234",
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it("should return 400 for wrong email", async () => {
    req.body = {
      email: "wrong@example.com",
      password: "irrelevant",
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ response: "Invalid credentials" });
  });

  it("should return 400 for wrong password", async () => {
    const hashedPassword = await bcrypt.hash("CorrectPass1", 10);
    await User.create({
      username: "passuser",
      email: "pass@example.com",
      password: hashedPassword,
    });

    req.body = {
      email: "pass@example.com",
      password: "WrongPass1",
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ response: "Invalid credentials" });
  });
});
