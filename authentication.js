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

    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ error: "Username and password are required!" });
    }
    try {
      const user = await User.findOne({ username: username });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            {
              user_id: user._id,
              username,
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
            .json({ error: "Invalid username / password combination!" });
        }
      } else {
        return res
          .status(400)
          .json({ error: "No user with given username found!" });
      }
    } catch (err) {
      console.error(err);
    }
  });

  app.post("/logout", auth, async (req, res) => {
    const { username } = req.user;
    try {
      const user = await User.findOne({ username });
      user.token = null;
      user.save();
      return res.status(200).json({ msg: "Logged out!" });
    } catch (err) {
      console.error(err);
    }
  });

  app.post("/signup", async (req, res) => {
    // Logic
    // 1. Verify if all data is correct
    // 2. Check if user still exists
    // 3. If not, create new user
    // 4. Create new JWT
    // 5. Send signed JWT with user object

    try {
      const { first_name, last_name, username, email, password } = req.body;

      if (!(password && username)) {
        res.status(400).json({ error: "All inputs are required" });
      }

      const oldUser = await User.findOne({ username });

      if (oldUser) {
        return res
          .status(400)
          .json({
            error: "Username is already taken. Try with a different username!",
          });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        first_name: first_name ? first_name : null,
        last_name: last_name ? last_name : null,
        email: email ? email.toLowerCase() : null,
        username: username,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: user._id,
          username,
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