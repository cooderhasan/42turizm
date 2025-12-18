'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface Reference {
    id: number;
    name: string;
    imageUrl: string;
}

interface ReferencesProps {
    references: Reference[];
}

export default function References({ references }: ReferencesProps) {
    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    if (!references || references.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <p className="text-center text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-2">Referanslarımız</p>
                <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-10">Bize Güvenen İş Ortaklarımız</h2>

                <div className="embla overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex items-center">
                        {references.map((ref) => (
                            <div className="embla__slide flex-[0_0_50%] md:flex-[0_0_25%] lg:flex-[0_0_16.666%] min-w-0 px-8" key={ref.id}>
                                <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    {/* Using a generic placeholder for logos, styled to look like a logo strip */}
                                    <div className="h-24 relative w-full">
                                        <Image
                                            src={ref.imageUrl}
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
