import { db } from './src/db';
import { tours, tourImages } from './src/db/schema';

const TOUR_PACKAGES = [
    {
        title: 'İstanbul Turları',
        slug: 'istanbul-turlari', // slug-ified manually
        coverImage: 'https://images.unsplash.com/photo-1546432426-1bef02476534?q=80&w=2000&auto=format&fit=crop',
        description: 'Tarihin ve modernizmin buluştuğu nokta İstanbul\'u keşfedin.',
        images: [
            'https://images.unsplash.com/photo-1546432426-1bef02476534?q=80&w=2000&auto=format&fit=crop', // Galata
            'https://images.unsplash.com/photo-1527685601638-cd014d5ce3e1?q=80&w=2000&auto=format&fit=crop', // Sultanahmet
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2049&auto=format&fit=crop', // Ortaköy
            'https://images.unsplash.com/photo-1622587853578-dd1bf9608d26?q=80&w=2071&auto=format&fit=crop', // Bosphorus
        ]
    },
    {
        title: 'Ege Turları',
        slug: 'ege-turlari',
        coverImage: 'https://images.unsplash.com/photo-1558254779-7a70823c9140?q=80&w=2070&auto=format&fit=crop',
        description: 'Ege\'nin eşsiz koyları ve antik kentlerinde unutulmaz bir yolculuk.',
        images: [
            'https://images.unsplash.com/photo-1558254779-7a70823c9140?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605345768587-9da5635c918c?q=80&w=2070&auto=format&fit=crop', // Datça/Marmaris vibe
            'https://images.unsplash.com/photo-1596489832267-331da294c64d?q=80&w=2070&auto=format&fit=crop', // Alaçatı
            'https://images.unsplash.com/photo-1555562090-ff31bf423e85?q=80&w=2070&auto=format&fit=crop', // Bodrum
        ]
    },
    {
        title: 'Güneydoğu Anadolu Turları',
        slug: 'guneydogu-anadolu-turlari',
        coverImage: 'https://images.unsplash.com/photo-1588661730095-2c8c49e79391?q=80&w=1974&auto=format&fit=crop',
        description: 'Gastronomi, tarih ve kültürün beşiği Güneydoğu\'yu keşfedin.',
        images: [
            'https://images.unsplash.com/photo-1588661730095-2c8c49e79391?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1587920149366-3d7fa33dc8e7?q=80&w=1974&auto=format&fit=crop', // Göbeklitepe mock
            'https://images.unsplash.com/photo-1628198941019-35c363d59659?q=80&w=2000&auto=format&fit=crop', // Gaziantep vibe
            'https://images.unsplash.com/photo-1632857417531-1554fa91c783?q=80&w=2070&auto=format&fit=crop', // Nemrut mock
        ]
    },
    {
        title: 'İç Anadolu Turları',
        slug: 'ic-anadolu-turlari',
        coverImage: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
        description: 'Kapadokya\'nın peribacalarından Ankara\'nın tarihine yolculuk.',
        images: [
            'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1570514809988-51f7d5403061?q=80&w=2070&auto=format&fit=crop', // Balloons
            'https://images.unsplash.com/photo-1595267440523-d8cd594960d7?q=80&w=2070&auto=format&fit=crop', // Salt Lake/Tuz gölü vibe
            'https://images.unsplash.com/photo-1583307584149-a2879599548f?q=80&w=2071&auto=format&fit=crop', // Anitkabir
        ]
    },
];

async function main() {
    console.log('Seeding Tours...');

    for (const pkg of TOUR_PACKAGES) {
        // Insert Tour
        const [insertedTour] = await db.insert(tours).values({
            title: pkg.title,
            slug: pkg.slug,
            coverImage: pkg.coverImage,
            description: pkg.description,
        }).returning({ id: tours.id });

        console.log(`Created Tour: ${pkg.title} (ID: ${insertedTour.id})`);

        // Insert Images
        for (const imgUrl of pkg.images) {
            await db.insert(tourImages).values({
                tourId: insertedTour.id,
                imageUrl: imgUrl,
            });
        }
    }

    console.log('Done!');
    process.exit(0);
}

main().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
