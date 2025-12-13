import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/db/schema.ts';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/turizm_db';

async function runMigration() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    try {
        await client.connect();
        const db = drizzle(client, { schema });

        console.log('Running database migration...');

        await migrate(db, { migrationsFolder: 'drizzle' });

        console.log('✅ Database migration completed successfully!');

    } catch (error) {
        console.error('❌ Error during migration:', error);
    } finally {
        await client.end();
    }
}

runMigration();
