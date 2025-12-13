import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/db/schema.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/turizm_db';

async function createTestimonialsTable() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    try {
        await client.connect();
        const db = drizzle(client, { schema });

        console.log('Creating testimonials table...');

        // Check if table exists
        const result = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'testimonials'
            );
        `);

        const tableExists = result.rows[0].exists;

        if (tableExists) {
            console.log('✅ Testimonials table already exists!');
            return;
        }

        // Create testimonials table
        await client.query(`
            CREATE TABLE testimonials (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                title TEXT,
                content TEXT NOT NULL,
                rating INTEGER DEFAULT 5,
                image_url TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                "order" INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('✅ Testimonials table created successfully!');

    } catch (error) {
        console.error('❌ Error creating testimonials table:', error);
    } finally {
        await client.end();
    }
}

createTestimonialsTable();