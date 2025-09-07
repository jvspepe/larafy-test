import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env";
import { auth } from "./lib/auth";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

// Configure CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.listen(env.PORT, async () => {
  console.log(`Server is running on port ${env.PORT}`);
});
