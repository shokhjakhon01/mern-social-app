import express from "express";
import mongoose from "mongoose";
import mongo_uri from "./src/keys/index.js";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";
import userRouter from "./src/routes/user.routes.js";
import dotnenv from "dotenv";
import cors from "cors";

// config of dotenv file
dotnenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// all routes
app.use(authRouter);
app.use(postRouter);
app.use(userRouter);

//connection of mongo
mongoose.connect(
  mongo_uri.mongo_uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("Mongodb connected successfully")
);


// server running code
app.listen(8000, console.log("Port is running on Port 8000"));
