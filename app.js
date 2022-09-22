// config environment variables
import dotenv from "dotenv";
dotenv.config();
// connect to database
import connect from "./config/database.js";
connect();

import auth from "./middleware/auth.js";

// create express app
import express from "express";
const app = express();
app.use(express.json());

// setup authentication routes
import initAuthentication from "./authentication.js";
initAuthentication(app);

// create your endpoints below


export default app;
