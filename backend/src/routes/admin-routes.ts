import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/admin-controller";

export const adminRouter = Router();

adminRouter.post("/users", createUser);
adminRouter.get("/users", getAllUsers);
