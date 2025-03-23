import express from "express";
import * as noteController from "../controllers/notes.controller";
import InputValidator from "../Validator/InputValidator";
import { NoteSchema } from "../utils/zodInputSchema";

const router = express.Router();

//get notes
router.get("/", noteController.getNotes);

//create notes
router.post("/", InputValidator(NoteSchema), noteController.createNote);

//update notes
router.patch("/:id", InputValidator(NoteSchema), noteController.updateNote);

//delete notes
router.delete("/:id", noteController.deleteNote);

export default router;
