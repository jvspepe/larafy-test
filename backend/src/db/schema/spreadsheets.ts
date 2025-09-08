import { sql } from "drizzle-orm";
import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const spreadsheets = pgTable("spreadsheets", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  data: json("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const spreadsheetInsertSchema = createInsertSchema(spreadsheets);
export const spreadsheetSelectSchema = createSelectSchema(spreadsheets);
export const spreadsheetUpdateSchema = createUpdateSchema(spreadsheets);
