import { Router } from "express";
import {
  createSpreadsheet,
  deleteSpreadsheet,
  getAllSpreadsheets,
  getSpreadsheet,
  updateSpreadsheet,
} from "../controllers/spreadsheet-controller";
import { requireAuth } from "../middleware/require-auth";

export const spreadsheetRouter = Router();

spreadsheetRouter.post("/", createSpreadsheet);
spreadsheetRouter.get("/", getAllSpreadsheets);
spreadsheetRouter.get("/:id", getSpreadsheet);
spreadsheetRouter.put("/:id", updateSpreadsheet);
spreadsheetRouter.delete("/:id", deleteSpreadsheet);
