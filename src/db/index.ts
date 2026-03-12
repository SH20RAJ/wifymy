import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
// Set max: 1 and fetch to avoid connection deadlock on Cloudflare Workers
const client = postgres(connectionString, { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
