import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z.string().nonempty("BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.url().nonempty("BETTER_AUTH_URL is required"),
  RESEND_API_KEY: z.string().nonempty("RESEND_API_KEY is required"),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.prettifyError(envParse.error)
  );
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;
