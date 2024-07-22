import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "f317dcf9dfc6896de3b1266c5116644adad9afceb0bce328816ecc02028d48e21c67d45087b08afda013bbe865ebe5f5717a8bf3b9d0e2107b22f0fa86577442";

export function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
