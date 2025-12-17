'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bus, Map, Plane, Car, Building2, ShieldCheck, Phone, User } from 'lucide-react';

// Icon mapping
const ICON_MAP: Record<string, React.ElementType> = {
    'Bus': Bus,
    'Map': Map,
    'Plane': Plane,
    'Car': Car,
    'Building2': Building2,
    'ShieldCheck': ShieldCheck,
    'Phone': Phone,
    'User': User // Added User just in case
};

interface ServiceItem {
    id: number;
    title: string;
    description: string | null; // Note: In DB it's detailedDescription or shortDescription? Schema has both. Let's use shortDescription for the card.
    shortDescription: string | null;
    slug: string;
    iconName: string | null;
    imageUrl: string | null;
}

interface ServicesProps {
    services: any[]; // Using any[] for now to avoid strict schema type import issues, or better define partial shape
}

export default function Services({ services }: ServicesProps) {
    const getIcon = (iconName: string | null) => {
        if (!iconName) return <Bus className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />;
        const IconComponent = ICON_MAP[iconName] || Bus;
        return <IconComponent className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />;
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-3">Hizmetlerimiz</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6">Sizin İçin Neler Yapıyoruz?</h3>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        42 Turizm olarak, sadece taşımacılık değil, kurumsal ihtiyaçlarınıza yönelik geniş bir hizmet yelpazesi sunuyoruz.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#d4af37]/30"
                        >
                            {/* Image Area */}
                            <div className="relative h-56 overflow-hidden">
                                {service.imageUrl ? (
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Floating Icon */}
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300">
                                    <div className="text-white">
                                        {React.cloneElement(getIcon(service.iconName) as React.ReactElement<any>, { className: "w-7 h-7 text-white" })}
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8">
                                <h4 className="text-xl font-bold text-[#0f172a] mb-4 group-hover:text-[#d4af37] transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {service.shortDescription || service.description}
                                </p>

                                <Link
                                    href={`/hizmetlerimiz/${service.slug}`}
                                    className="inline-flex items-center text-[#0f172a] font-bold text-sm uppercase tracking-wider group-hover:text-[#d4af37] transition-colors"
                                >
                                    Detaylı İncele <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Contact Box for "Special Requests" */}
                    <div className="bg-[#0f172a] rounded-xl shadow-xl p-10 flex flex-col items-center justify-center text-center text-white min-h-[400px] border border-gray-800 relative overflow-hidden group">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4af37] opacity-10 rounded-full -ml-16 -mb-16 blur-xl"></div>

                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-9 h-9 text-[#d4af37]" />
                        </div>
                        <h4 className="text-2xl font-bold mb-4 text-white">Özel Talepleriniz İçin</h4>
                        <p className="opacity-80 mb-10 leading-relaxed text-sm">
                            Listelenen hizmetler dışında özel kurumsal talepleriniz mi var? Bize ulaşın, size özel VIP çözümler üretelim.
                        </p>
                        <Link
                            href="/iletisim"
                            className="bg-[#d4af37] text-white px-10 py-4 rounded-full font-bold hover:bg-[#b5952f] transition-all shadow-lg shadow-[#d4af37]/20"
                        >
                            Bize Ulaşın
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
