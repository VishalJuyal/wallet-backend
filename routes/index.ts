import express from "express";
import userRouter from "../controller/user-controller";
const router = express.Router();

router.use("/user", userRouter);

export default router;
