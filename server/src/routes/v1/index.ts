import { Router } from "express"
import { notesRouter } from "./routes.notes"
export const router = Router();

router.use("/notes", notesRouter)
