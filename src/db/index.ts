import { drizzle as drizzleLibsql } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from './schema';

/**
 * Database initialization helper.
 * Separates local (LibSQL/SQLite file) and remote (Cloudflare D1) instances.
 */
const getDb = () => {
    // Check for Cloudflare D1 binding (Production/Edge)
    if (process.env.DB) {
        return drizzleD1(process.env.DB as unknown as import('@cloudflare/workers-types').D1Database, { schema });
    }
    
    // Fallback to Local LibSQL (Development)
    const url = process.env.DATABASE_URL || 'file:local.db';
    const client = createClient({
        url: url,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    return drizzleLibsql(client, { schema });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = getDb() as any;
