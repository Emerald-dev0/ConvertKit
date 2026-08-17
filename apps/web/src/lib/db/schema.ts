import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

/**
 * Logs every conversion attempt (for Analytics and Admin Dashboard).
 */
export const conversions = sqliteTable("conversions", {
  id: text("id").primaryKey(), // UUID
  userId: text("user_id"),     // Optional: For Pro accounts
  fromFormat: text("from_format").notNull(),
  toFormat: text("to_format").notNull(),
  inputSize: integer("input_size").notNull(),   // Bytes
  outputSize: integer("output_size"),           // Bytes
  duration: real("duration"),                    // ms
  status: text("status").notNull(),              // 'success', 'failed'
  storageKey: text("storage_key"),               // For R2 lookup
  error: text("error"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

/**
 * Early-access waitlist for the Pro plan.
 */
export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
