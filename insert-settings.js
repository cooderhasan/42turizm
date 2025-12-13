import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/db/schema.ts';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/turizm_db';

async function insertSettings() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    try {
        await client.connect();
        const db = drizzle(client, { schema });

        console.log('Checking for existing settings...');

        // Check if settings exist
        const existingSettings = await db.select().from(schema.settings).limit(1);

        if (existingSettings.length === 0) {
            console.log('No settings found. Inserting default settings...');

            await db.insert(schema.settings).values({
                siteTitle: '42 Turizm',
                siteDescription: 'İstanbul Personel ve Öğrenci Taşımacılığı',
                address: 'Örnek Mahallesi, Turizm Caddesi No: 42 Kadıköy / İstanbul',
                phone1: '+90 555 555 55 55',
                email: 'info@42turizm.com',
                whatsappNumber: '905555555555',
                aboutText: '2010 yılından beri güvenli ve konforlu taşımacılık hizmetleri sunuyoruz.',
                missionText: 'Müşteri memnuniyetini en üst düzeyde tutarak, güvenli ve zamanında ulaşım hizmetleri sunmak.',
                visionText: 'Türkiye\'nin en güvenilir taşımacılık şirketi olmak ve uluslararası standartlarda hizmet vermek.',
                logoUrl: '/uploads/logo/logo.png'
            });

            console.log('✅ Settings inserted successfully!');
        } else {
            console.log('✅ Settings already exist:', existingSettings[0]);
        }

    } catch (error) {
        console.error('❌ Error inserting settings:', error);
    } finally {
        await client.end();
    }
}

insertSettings();