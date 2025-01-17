import express from "express";
import userService from "../services/user-service";
import { authMiddleWare } from "../middlewares/authMiddleware";
import { rateLimiterMiddleware } from "../middlewares/rateLimiter";
import { generateToken } from "../middlewares/generateToken";

const router = express.Router();

router.get(
  "/details",
  authMiddleWare,
  rateLimiterMiddleware,
  async (req: any, res: any) => {
    try {
      await userService.getUsers(req, res);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";

      return res.status(statusCode).json({
        status: statusCode,
        message: message,
      });
    }
  }
);

router.post("/login", rateLimiterMiddleware, async (req: any, res: any) => {
  try {
    const { email, password } = req?.body;
    console.log(req?.body);
    const findUserAndAuthorize: any = await userService.loginUser({
      email,
      password,
    });
    const token = await generateToken(req, res);
    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      data: {
        userId: findUserAndAuthorize._id,
        email: findUserAndAuthorize.email,
        fullName: findUserAndAuthorize.fullName,
        roleId: findUserAndAuthorize.roleId,
        token: token,
      },
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }
});

router.post("/register", rateLimiterMiddleware, async (req: any, res: any) => {
  try {
    const { email, password } = req?.body;
    console.log(req?.body);
    const findUserAndAuthorize: any = await userService.registerUser({
      email,
      password,
    });
    const token = await generateToken(req, res);
    return res.status(200).json({
      status: 200,
      message: "User Registered successfully",
      data: {
        userId: findUserAndAuthorize._id,
        email: findUserAndAuthorize.email,
        fullName: findUserAndAuthorize.fullName,
        designation: findUserAndAuthorize.designation,
        token: token,
      },
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }
});

router.put("/update", rateLimiterMiddleware, async (req: any, res: any) => {
  try {
    const { _id, roleId } = req?.body;
    console.log(req?.body);
    const findUserAndAuthorize: any = await userService.updateUser({
      _id,
      roleId,
    });
    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: {
        findUserAndAuthorize,
      },
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }
});

export default router;
