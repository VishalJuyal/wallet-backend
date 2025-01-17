import jwt from "jsonwebtoken";
import { z } from "zod";

// const userSchema = z.object({
//   userName: z.string().email(),
//   password: z.string().length(10),
// });

export const authMiddleWare = (req: any, res: any, next: any) => {
  try {
    const { authToken } = req.cookies;
    const jwtToken = jwt.verify(
      authToken,
      process.env.JWT_SECRET_KEY as string
    );
    console.log(jwtToken);
    next();
  } catch (error) {
    res.status(400).send({ message: error || "Arguments required" });
    console.log(error);
  }
};
