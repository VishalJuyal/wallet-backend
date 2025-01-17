import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import mainRouter from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_HOST,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
