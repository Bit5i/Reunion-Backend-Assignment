import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import globalRoutes from "./routes/global.js"

const app = express();
app.get('/', (req, res) => {
  res.send('Server running successfully');
});

dotenv.config();

const connect = () => {
  mongoose.set("strictQuery",false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to mongo database");
    })
    .catch((err) => {
      throw err;
    });
};

const router = express.Router()

app.use(cookieParser());
app.use(express.json());
app.use("/api", globalRoutes)

app.listen(8000, () => {
    connect();
  console.log("Listening on port 8000");
});

export default app;