import { Request, Response } from "express";
import { userInsertSchema, users } from "../db/schema/users";
import { auth } from "../lib/auth";
import { db } from "../config/db";

export const createUser = async (req: Request, res: Response) => {
  try {
    const parsedBody = userInsertSchema
      .pick({
        email: true,
        name: true,
      })
      .safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error });
    }

    await auth.api.signUpEmail({
      body: {
        email: parsedBody.data.email,
        name: parsedBody.data.name,
        password: Date.now().toString(),
      },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(users);
    return res.status(200).json({
      message: "Usuários buscados com sucesso",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
