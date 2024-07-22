import userModel from "../models/userModel.js";

export async function getAllUsers() {
  return await userModel.find();
}

export async function getUserById(userId) {
  return await userModel.findById(userId);
}

export async function createUser(userData) {
  const user = new userModel(userData);
  return await user.save();
}

export async function deleteUserById(userId) {
  return await userModel.findByIdAndDelete(userId);
}

export async function updateUserById(userId, userData) {
  return await userModel.findByIdAndUpdate(userId, userData, { new: true });
}
