import express from "express";
import * as NotesController from "../controllers/notes";
import { validateNotes } from "../middleware/validations/validateNotes";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.post("/", validateNotes, NotesController.createNote);

router.patch("/:noteId", validateNotes, NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;