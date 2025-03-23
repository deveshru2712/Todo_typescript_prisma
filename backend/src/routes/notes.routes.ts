import express from "express";
import * as noteController from "../controllers/notes.controller";

const router = express.Router();

router.get("/", noteController.getNotes); //get notes
router.post("/", noteController.createNote); //create notes
router.patch("/:id", noteController.updateNote); //update notes
router.delete("/:id", noteController.deleteNote); //delete notes

export default router;
