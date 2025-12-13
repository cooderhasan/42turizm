
import { db } from './index';
import { users, references } from './schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log('Seeding database...');

    try {
        // Seed Admin User
        const existingUser = await db.select().from(users).where(eq(users.email, 'admin@42turizm.com'));

        if (existingUser.length === 0) {
            await db.insert(users).values({
                email: 'admin@42turizm.com',
                password: 'admin', // Simple password for initial access
                role: 'admin',
            });
            console.log('✅ Admin user created: admin@42turizm.com / admin');
        } else {
            console.log('ℹ️  Admin user already exists.');
        }

        // Seed References
        const existingReferences = await db.select().from(references);

        if (existingReferences.length === 0) {
            await db.insert(references).values([
                {
                    name: 'Turkish Airlines',
                    imageUrl: '/references/turkish-airlines.png',
                    category: 'private',
                    order: 1,
                },
                {
                    name: 'Milli Eğitim Bakanlığı',
                    imageUrl: '/references/meb.png',
                    category: 'public',
                    order: 2,
                },
                {
                    name: 'Koç Holding',
                    imageUrl: '/references/koc-holding.png',
                    category: 'private',
                    order: 3,
                },
                {
                    name: 'Sabancı Holding',
                    imageUrl: '/references/sabanci.png',
                    category: 'private',
                    order: 4,
                },
                {
                    name: 'Eczacıbaşı',
                    imageUrl: '/references/eczacibasi.png',
                    category: 'private',
                    order: 5,
                },
                {
                    name: 'Turkcell',
                    imageUrl: '/references/turkcell.png',
                    category: 'private',
                    order: 6,
                },
            ]);
            console.log('✅ 6 örnek referans eklendi.');
        } else {
            console.log('ℹ️  Referanslar zaten mevcut.');
        }

        console.log('🎉 Seed işlemi tamamlandı!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        process.exit(0);
    }
}

main();
