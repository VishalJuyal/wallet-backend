import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return limiter(req, res, next);
};
