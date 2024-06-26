import app from "./app";

import mongoose from "mongoose";

import env from "./utils/validateEnv";

const port = env.PORT || 5000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to MongoDb!");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(console.error);
