import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env";
import { auth } from "./lib/auth";
import { spreadsheetRouter } from "./routes/spreadsheet-routes";
import { adminRouter } from "./routes/admin-routes";
import { requireAuth } from "./middleware/require-auth";
import { requireRole } from "./middleware/require-role";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/spreadsheets", requireAuth, spreadsheetRouter);
app.use("/api/admin", requireAuth, requireRole(["super_admin"]), adminRouter);
app.listen(env.PORT, async () => {
  console.log(`Server is running on port ${env.PORT}`);
});
