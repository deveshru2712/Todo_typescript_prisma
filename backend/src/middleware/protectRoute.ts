import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import prismaClient from "../config/getClient";

interface JwtPayload {
  userId: number;
}

const protectRoute: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.key;
    if (!token) {
      throw createHttpError(401, "Unauthorized - no token exists");
    }

    const decode = jwt.verify(token, env.JWT_KEY) as JwtPayload;
    if (!decode) {
      throw createHttpError(401, "Unauthorized - invalid token");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decode.userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;
