import express from "express";
import * as authController from "../controllers/auth.controller";
import authInputValidator from "../Validator/authInputValidator";
import * as inputSchema from "../utils/zodAuthSchema";

const router = express.Router();

router.post(
  "/signup",
  authInputValidator(inputSchema.signupSchema),
  authController.signUp
);

router.post(
  "/login",
  authInputValidator(inputSchema.loginSchema),
  authController.logIn
);

router.post("/logout", authController.logOut);

export default router;
