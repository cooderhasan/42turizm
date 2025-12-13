
import { db } from '@/db';
import { vehicles, references, heroSlides } from '@/db/schema';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('Seeding data...');

    // 1. Seed Vehicles
    console.log('Seeding Vehicles...');
    const vehicleData = [
        {
            category: 'binek',
            name: 'Renault Megane',
            capacity: 4,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop',
            order: 1
        },
        {
            category: 'binek',
            name: 'Fiat Egea',
            capacity: 4,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop',
            order: 2
        },
        {
            category: 'vip',
            name: 'Mercedes Vito VIP',
            capacity: 7, // approximate
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1605218427360-692798e49520?q=80&w=2070&auto=format&fit=crop',
            order: 3
        },
        {
            category: 'vip',
            name: 'Volkswagen Transporter VIP',
            capacity: 8,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1627916538562-f9479e0f624e?q=80&w=2070&auto=format&fit=crop',
            order: 4
        },
        {
            category: 'minibus',
            name: 'Volkswagen Crafter',
            capacity: 19,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1736614488582-72cc6d2af40b?q=80&w=2128&auto=format&fit=crop',
            order: 5
        },
        {
            category: 'minibus',
            name: 'Mercedes Sprinter',
            capacity: 19,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1563200926-80f08985168e?q=80&w=2070&auto=format&fit=crop',
            order: 6
        },
        {
            category: 'otobus',
            name: 'Mercedes Tourismo',
            capacity: 46,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
            order: 7
        },
        {
            category: 'otobus',
            name: 'Temsa Safir',
            capacity: 46,
            fuelType: 'Dizel',
            driverOption: 'Şoförlü',
            imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
            order: 8
        },
    ];

    for (const vehicle of vehicleData) {
        await db.insert(vehicles).values(vehicle).onConflictDoNothing();
    }


    // 2. Seed Hero Slides
    console.log('Seeding Hero Slides...');
    const heroData = [
        {
            title: 'Şehrin Her Noktasına Güvenli Ulaşım',
            subtitle: 'Konforlu ve modern araç filomuzla hizmetinizdeyiz.',
            imageUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop',
            order: 1
        },
        {
            title: 'Personel ve Öğrenci Taşımacılığı',
            subtitle: 'Zamanında ve güvenli servis hizmetleri.',
            imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
            order: 2
        },
        {
            title: 'VIP Transfer Hizmetleri',
            subtitle: 'Özel günleriniz ve iş seyahatleriniz için premium çözümler.',
            imageUrl: 'https://images.unsplash.com/photo-1562920616-d44cb27f8a31?q=80&w=2070&auto=format&fit=crop',
            order: 3
        },
    ];

    for (const slide of heroData) {
        // Simple check to avoid duplicates based on title if desired, or just insert
        // Since we are just seeding example data, we can try insert
        await db.insert(heroSlides).values(slide).onConflictDoNothing();
    }

    console.log('Seeding completed.');
    process.exit(0);
}

main().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
