import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  text: z.string({
    required_error: "Title is required",
    invalid_type_error: "Text must be a string",
  }),
});
