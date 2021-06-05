import { Response } from "express";
import { pullRandomNotes } from "./webScrapper/todoist";


export const getNotesRandom = async (req: any, res: Response) =>
  res.send(await pullRandomNotes(req));
