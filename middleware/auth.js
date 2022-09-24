import jwt from "jsonwebtoken";
import User from "../model/user.js";

const config = process.env;

const verifyToken = async (req, res, next) => {

  // Logic:
  // If token is valid, attach user name
  // Else, cancel request
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(400).json({"error": "Unauthorized. No access token provided!"});
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    const user = await User.findOne({username: decoded.username });
    if (!user.token) {
      return res.status(400).json({"error": "Not logged in!"});
    }

    req.user = decoded;
  } catch(err) {
    return res.status(400).json({"error": "Invalid Token!"});
  }

  return next();
}

export default verifyToken;