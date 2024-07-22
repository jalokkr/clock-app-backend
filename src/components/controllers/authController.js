import { authenticateUser } from "../services/authService.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
