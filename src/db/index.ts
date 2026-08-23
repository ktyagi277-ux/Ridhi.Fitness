import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// Lazy init so the app can build without DATABASE_URL; it's only required at query time.
function getPool(): Pool {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({ connectionString: databaseUrl });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

let cachedDb: NodePgDatabase | undefined;

export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop) {
    if (!cachedDb) cachedDb = drizzle(getPool());
    const value = (cachedDb as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(cachedDb) : value;
  },
});
