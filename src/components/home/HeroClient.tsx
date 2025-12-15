
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
                                {/* Darker Overlay for VIP feel */}
                                <div className="absolute inset-0 bg-black/60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-[#0f172a]/30" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                                <div className="max-w-5xl mx-auto space-y-8">
                                    <div className="animate-fade-in-up">
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-2">
                                            {slide.title}
                                        </h1>
                                        <div className="h-1 w-24 bg-[#d4af37] mx-auto rounded-full mt-6 mb-6"></div>
                                    </div>

                                    {slide.subtitle && (
                                        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in-up delay-100">
                                            {slide.subtitle}
                                        </p>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10 animate-fade-in-up delay-200">
                                        <Link
                                            href={slide.buttonLink || "/iletisim"}
                                            className="bg-[#d4af37] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#b5952f] transition-all transform hover:scale-105 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 border border-[#d4af37]"
                                        >
                                            {slide.buttonText || "Hemen Teklif Alın"} <ArrowRight size={20} />
                                        </Link>
                                        <Link
                                            href="/hizmetlerimiz"
                                            className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0f172a] transition-all transform hover:scale-105 backdrop-blur-sm"
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
