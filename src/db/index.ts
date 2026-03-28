import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/users";


const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("Databse URL not set");
}

const client = postgres(connectionString);
export const db = drizzle(client)