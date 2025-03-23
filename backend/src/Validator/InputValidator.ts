import { RequestHandler } from "express";
import { z } from "zod";

const InputValidator =
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

export default InputValidator;
