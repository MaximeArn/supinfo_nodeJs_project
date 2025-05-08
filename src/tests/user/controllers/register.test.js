import mongoose from "mongoose";
import { jest } from "@jest/globals";
import dotenv from "dotenv";

import User from "../../../models/User.js";
import { registerUser } from "../../../controllers/users.controller.js";

dotenv.config();

describe("user registration", () => {
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

  it("should register a user and return a token", async () => {
    req.body = {
      username: "simpleUser",
      email: "simple@example.com",
      password: "Test1234",
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it("should return 400 if email already exists", async () => {
    await User.create({
      username: "existing",
      email: "duplicate@example.com",
      password: "hashedPassword",
    });

    req.body = {
      username: "newuser",
      email: "duplicate@example.com",
      password: "Test1234",
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ response: "Email already in use" });
  });
});
