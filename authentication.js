import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./model/user.js";

import auth from "./middleware/auth.js";

const initAuthentication = (app) => {
  app.post("/login", async (req, res) => {
    // Logic
    // 1. Validate user info
    // 2. Get user from database
    // 3. Match password hashes
    // 4. If yes, generate token
    // 5. Attach token and send back

    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }
    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "7d",
            }
          );
          user.token = token;

          user.save();

          return res.status(200).json(user);
        } else {
          return res
            .status(400)
            .json({ error: "Invalid email / password combination!" });
        }
      } else {
        return res
          .status(400)
          .json({ error: "No user with given email ID found!" });
      }
    } catch (err) {
      console.error(err);
    }
  });

  app.post("/logout", auth, async (req, res) => {
    const { email } = req.user;
    try {
      const user = await User.findOne({ email });
      user.token = null;
      user.save();
      return res.status(200).json({ msg: "Logged out!" });
    } catch (err) {
      console.error(err);
    }
  });

  app.post("/register", async (req, res) => {
    // Logic
    // 1. Verify if all data is correct
    // 2. Check if user still exists
    // 3. If not, create new user
    // 4. Create new JWT
    // 5. Send signed JWT with user object

    try {
      const { first_name, last_name, email, password } = req.body;

      if (!(email && password && first_name && last_name)) {
        res.status(400).json({ error: "All inputs are required" });
      }

      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res
          .status(400)
          .json({
            error: "Email is already taken. Try with a different email ID!",
          });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );

      user.token = token;
      user.save();

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
    }
  });
};

export default initAuthentication;