import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgran from "morgan";
import cookieParser from "cookie-parser";
import createHttpError, { isHttpError } from "http-errors";
import { z, ZodError } from "zod";

import env from "./utils/validateEnv";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(morgran("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Page not found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = error || "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }

  if (error instanceof z.ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    // Log formatted errors

    console.error(`Zod Validation Errors:`);
    formattedErrors.forEach((error) => {
      console.error(`Field: ${error.field}, Message: ${error.message}`);
    });

    // Send formatted errors in response

    res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
    return;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(env.PORT, () => {
  console.log(`The server is running on the port: ${env.PORT}`);
});
