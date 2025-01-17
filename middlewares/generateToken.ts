import jwt from "jsonwebtoken";

export const generateToken = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const secretKey = process.env.JWT_SECRET_KEY as string;
    // console.log(jwtToken);
    // const valiDation = userSchema.parse({ userName, password });
    const token = jwt.sign({ email, password }, secretKey, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    res.status(400).send({ message: error || "Arguments required" });
    console.log(error);
  }
};
