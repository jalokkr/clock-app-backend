import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
const tokenBlacklist = new Set();

export function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  if (tokenBlacklist.has(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
