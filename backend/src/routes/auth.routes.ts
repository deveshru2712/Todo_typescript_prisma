import express from "express";
import * as authController from "../controllers/auth.controller";
import InputValidator from "../Validator/InputValidator";
import * as inputSchema from "../utils/zodAuthSchema";

const router = express.Router();

router.post(
  "/signup",
  InputValidator(inputSchema.signupSchema),
  authController.signUp
);

router.post(
  "/login",
  InputValidator(inputSchema.loginSchema),
  authController.logIn
);

router.post("/logout", authController.logOut);

export default router;
