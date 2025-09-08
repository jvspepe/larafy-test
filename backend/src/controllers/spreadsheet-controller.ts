import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../config/db";
import {
  spreadsheets,
  spreadsheetInsertSchema,
  spreadsheetUpdateSchema,
} from "../db/schema/spreadsheets";

export const getSpreadsheet = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "ID is required" });

  const data = await db
    .select()
    .from(spreadsheets)
    .where(eq(spreadsheets.id, id))
    .limit(1);

  if (!data || data.length === 0)
    return res.status(404).json({ error: "Not found" });

  const [result] = data;

  return res.status(200).json({
    data: result,
  });
};

export const getAllSpreadsheets = async (_req: Request, res: Response) => {
  try {
    const data = await db.select().from(spreadsheets);

    return res.status(200).json(data);
  } catch (error) {
    console.error("getAllSpreadsheets error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createSpreadsheet = async (req: Request, res: Response) => {
  try {
    const parsed = spreadsheetInsertSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: z.treeifyError(parsed.error),
      });
    }

    const insertData = parsed.data;

    const [result] = await db
      .insert(spreadsheets)
      .values(insertData)
      .returning();

    return res.status(201).json({
      message: "Spreadsheet created successfully",
      data: result,
    });
  } catch (err) {
    console.error("createSpreadsheet error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSpreadsheet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const parsed = spreadsheetUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: z.treeifyError(parsed.error),
      });
    }

    const updateData = parsed.data;

    const existing = await db
      .select()
      .from(spreadsheets)
      .where(eq(spreadsheets.id, id))
      .limit(1);

    if (!existing || existing.length === 0) {
      return res.status(404).json({ error: "Spreadsheet not found" });
    }

    const [updatedSpreadsheet] = await db
      .update(spreadsheets)
      .set(updateData)
      .where(eq(spreadsheets.id, id))
      .returning();

    return res.status(200).json({
      message: "Spreadsheet updated successfully",
      data: updatedSpreadsheet,
    });
  } catch (error) {
    console.error("updateSpreadsheet error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSpreadsheet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await db.delete(spreadsheets).where(eq(spreadsheets.id, id));

    return res.status(200).json({ message: "Tabela excluída com sucesso" });
  } catch (error) {
    console.error("deleteSpreadsheet error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
