import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      if (process.env.DEBUG === "True") {
        console.log("DEBUG: True. Successfully connected to local database");
      } else {
        console.log("DEBUG: False. Successfully connected to database");
      }
    })
    .catch((error) => {
      console.log("Database connection failed.");
      console.error(error);
      process.exit(1);
    });
};

export default connect;
