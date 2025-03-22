import { RequestHandler } from "express";
import { z } from "zod";

const authInputValidator =
  (schema: z.ZodSchema): RequestHandler =>
  async (req, res, next) => {
    try {
      //validating the req.body
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authInputValidator;
