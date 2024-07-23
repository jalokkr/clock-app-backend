import { authenticateUser, logoutUser } from "../services/authService.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export function logout(req, res) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  logoutUser(token);
  res.json({ message: "Successfully logged out" });
}