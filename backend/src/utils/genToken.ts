import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";

const genToken = (userId: number, res: Response): boolean => {
  try {
    const token = jwt.sign({ userId }, env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.cookie("key", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV !== "development",
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default genToken;
