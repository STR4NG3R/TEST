import { Router } from "express";
import { getNotesRandom } from "../../controller/notes";
export const notesRouter = Router();

notesRouter.get("/getNotes", getNotesRandom);
