import express from "express";
import * as noteController from "../controllers/notes.controller";
import InputValidator from "../Validator/InputValidator";
import { NoteSchema } from "../utils/zodInputSchema";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

//get notes
router.get("/", protectRoute, noteController.getNotes);

//create notes
router.post(
  "/",
  InputValidator(NoteSchema),
  protectRoute,
  noteController.createNote
);

//update notes
router.patch(
  "/:id",
  InputValidator(NoteSchema),
  protectRoute,
  noteController.updateNote
);

//delete notes
router.delete("/:id", protectRoute, noteController.deleteNote);

router.patch("/status/:id", protectRoute, noteController.updateStatus);

export default router;
