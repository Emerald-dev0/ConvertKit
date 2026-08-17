import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

/**
 * Standard database connection.
 * Future: Use drizzle-orm/d1 when deployed to Cloudflare.
 */
const sqlite = new Database("convertkit.db");
export const db = drizzle(sqlite, { schema });
