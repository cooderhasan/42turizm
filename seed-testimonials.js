import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/db/schema.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/turizm_db';

async function seedTestimonials() {
    const client = new Client({ connectionString: CONNECTION_STRING });
    try {
        await client.connect();
        const db = drizzle(client, { schema });

        console.log('Seeding example testimonials...');

        // Check if testimonials already exist
        const existing = await db.select().from(schema.testimonials);
        if (existing.length > 0) {
            console.log('✅ Testimonials already exist, skipping seed.');
            return;
        }

        // Insert example testimonials
        await db.insert(schema.testimonials).values([
            {
                name: 'Ahmet Yılmaz',
                title: 'İK Müdürü, Tech Corp',
                content: 'Personel taşımacılığında 3 yıldır 42 Turizm ile çalışıyoruz. Dakiklikleri ve araç temizlikleri konusunda çok titizler. Kesinlikle tavsiye ederim.',
                rating: 5,
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
                isActive: true,
                order: 1
            },
            {
                name: 'Ayşe Demir',
                title: 'Okul Müdürü, Bilgi Koleji',
                content: 'Öğrenci servislerimiz için güvenilir bir ortak arıyorduk. Araç takip sistemleri ve rehber personelin ilgisi velilerimizi çok memnun etti.',
                rating: 5,
                imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
                isActive: true,
                order: 2
            },
            {
                name: 'Mehmet Öztürk',
                title: 'Operasyon Müdürü, Lojistik A.Ş.',
                content: 'VIP transfer hizmetlerini yurt dışı misafirlerimiz için kullanıyoruz. Araçlar son model ve şoförler çok profesyonel. Teşekkürler.',
                rating: 5,
                imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
                isActive: true,
                order: 3
            },
            {
                name: 'Zeynep Kaya',
                title: 'Etkinlik Organizatörü',
                content: 'Büyük çaplı organizasyonlarımızda ulaşım sponsorumuz 42 Turizm. Esnek çözümleri ve kriz anındaki hızlı aksiyonları hayat kurtarıcı.',
                rating: 5,
                imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
                isActive: true,
                order: 4
            }
        ]);

        console.log('✅ Example testimonials seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding testimonials:', error);
    } finally {
        await client.end();
    }
}

seedTestimonials();