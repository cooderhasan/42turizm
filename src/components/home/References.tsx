'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

// Placeholder logos - in a real scenario, these would be actual partner logos
const REFERENCES = [
    { id: 1, name: 'Partner 1', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' }, // Generic company logo
    { id: 2, name: 'Partner 2', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
    { id: 3, name: 'Partner 3', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
    { id: 4, name: 'Partner 4', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
    { id: 5, name: 'Partner 5', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
    { id: 6, name: 'Partner 6', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop' },
];

export default function References() {
    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    return (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-500 font-medium mb-10 text-lg">Bize Güvenen İş Ortaklarımız</p>

                <div className="embla overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex items-center">
                        {REFERENCES.map((ref) => (
                            <div className="embla__slide flex-[0_0_50%] md:flex-[0_0_25%] lg:flex-[0_0_16.666%] min-w-0 px-8" key={ref.id}>
                                <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    {/* Using a generic placeholder for logos, styled to look like a logo strip */}
                                    <div className="h-12 relative w-full aspect-[3/1]">
                                        <Image
                                            src={ref.logo}
                                            alt={ref.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
