
'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string | null;
    imageUrl: string;
    buttonText: string | null;
    buttonLink: string | null;
}

interface HeroClientProps {
    slides: HeroSlide[];
}

export default function HeroClient({ slides }: HeroClientProps) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gray-900">
            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full flex">
                    {slides.map((slide) => (
                        <div className="embla__slide relative h-full flex-[0_0_100%] min-w-0" key={slide.id}>
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === slides[0]?.id}
                                />
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/50" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                                <div className="max-w-4xl mx-auto space-y-6">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up">
                                        {slide.title}
                                    </h1>
                                    {slide.subtitle && (
                                        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
                                            {slide.subtitle}
                                        </p>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                        <Link
                                            href={slide.buttonLink || "/iletisim"}
                                            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                        >
                                            {slide.buttonText || "Hemen Teklif Alın"} <ArrowRight size={20} />
                                        </Link>
                                        <Link
                                            href="/hizmetlerimiz"
                                            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
                                        >
                                            Hizmetlerimizi İnceleyin
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
