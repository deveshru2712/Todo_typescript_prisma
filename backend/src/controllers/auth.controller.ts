import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import prismaClient from "../config/getClient";
import genToken from "../utils/genToken";

interface SignUpBody {
  username: string;
  email: string;
  password: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw createHttpError(
        409,
        "Email is already associated with another account"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prismaClient.user.create({
      data: { username, email, password: hashedPassword },
      select: { id: true, email: true, username: true },
    });

    const tokenGenerated = genToken(user.id, res);

    if (!tokenGenerated) {
      throw createHttpError(409, "Authorization error");
    }

    res.status(201).json({
      user,
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

interface LogInBody {
  email: string;
  password: string;
}

export const logIn: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw createHttpError(404, "Account not Found!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw createHttpError(409, "Invalid credentials");
    }

    const tokenGenerated = genToken(user.id, res);

    if (!tokenGenerated) {
      throw createHttpError(409, "Authorization error");
    }

    res.status(200).json({
      user: { ...user, password: null },
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logOut: RequestHandler = (req, res, next) => {
  try {
    res.cookie("key", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
