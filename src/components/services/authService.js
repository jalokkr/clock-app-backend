import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const tokenBlacklist = new Set(); 

export async function authenticateUser(email, password) {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return { token, user };
}

export function logoutUser(token) {
  tokenBlacklist.add(token); 
}
