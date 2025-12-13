import React from 'react';
import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import HeroClient from './HeroClient';

export default async function Hero() {
    const slides = await db.select()
        .from(heroSlides)
        .where(eq(heroSlides.isActive, true))
        .orderBy(asc(heroSlides.order));

    // Fallback to default slides if none in DB
    const displaySlides = slides.length > 0 ? slides : [
        {
            id: 1,
            title: 'Şehrin Her Noktasına Güvenli Ulaşım',
            subtitle: 'Konforlu ve modern araç filomuzla hizmetinizdeyiz.',
            imageUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop',
            buttonText: null,
            buttonLink: null,
            isActive: true,
            order: 1,
            createdAt: new Date()
        }
    ];

    return <HeroClient slides={displaySlides} />;
}
