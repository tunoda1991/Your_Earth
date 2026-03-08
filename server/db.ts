import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  const pool = new pg.Pool({
    connectionString,
    ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
  });

  return drizzle(pool);
}

export const db = createDb();
export type DB = NonNullable<ReturnType<typeof createDb>>;
