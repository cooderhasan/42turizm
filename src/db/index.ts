import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:123456@localhost:5433/turizm_db";

console.log('DB Connection String (masked):', connectionString.replace(/:[^:]+@/, ':***@'));

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
