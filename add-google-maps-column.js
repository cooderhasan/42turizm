import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/turizm_db';

async function addGoogleMapsColumn() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    try {
        await client.connect();

        console.log('Adding google_maps_embed_url column to settings table...');

        // Check if the column already exists
        const checkResult = await client.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'settings' AND column_name = 'google_maps_embed_url'
        `);

        if (checkResult.rows.length === 0) {
            // Add the column if it doesn't exist
            await client.query(`
                ALTER TABLE settings
                ADD COLUMN google_maps_embed_url text
            `);
            console.log('✅ google_maps_embed_url column added successfully!');
        } else {
            console.log('ℹ️ google_maps_embed_url column already exists');
        }

    } catch (error) {
        console.error('❌ Error adding column:', error);
    } finally {
        await client.end();
    }
}

addGoogleMapsColumn();