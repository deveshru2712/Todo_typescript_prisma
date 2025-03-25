import express from "express";
import * as authController from "../controllers/auth.controller";
import InputValidator from "../Validator/InputValidator";
import * as inputSchema from "../utils/zodAuthSchema";
import protectRoute from "../middleware/protectRoute";

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

router.get("/", protectRoute, authController.getMe);
export default router;
