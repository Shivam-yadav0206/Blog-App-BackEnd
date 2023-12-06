import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ msg: "Token is Missing" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};
