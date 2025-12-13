'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Users, Calendar, Award } from 'lucide-react';

const STATS = [
    { label: 'Yıllık Tecrübe', value: '15+', icon: Calendar },
    { label: 'Mutlu Müşteri', value: '10k+', icon: Users },
    { label: 'Araç Filosu', value: '50+', icon: Award },
];

export default function About() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop"
                                alt="42 Turizm Ofis ve Araçlar"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white hidden md:flex border-8 border-white">
                            <span className="text-5xl font-bold">15</span>
                            <span className="text-lg font-medium">Yıllık Tecrübe</span>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-4">Hakkımızda</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                            Güvenli ve Konforlu <br /> <span className="text-blue-600">Yolculuğun Adresi</span>
                        </h2>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            42 Turizm olarak, 2008 yılından bu yana taşımacılık sektöründe güven ve kaliteyi bir araya getiriyoruz.
                            Modern araç filomuz, deneyimli sürücü kadromuz ve teknolojik altyapımızla personel taşımacılığı,
                            öğrenci servis hizmetleri ve VIP transfer çözümleri sunuyoruz.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                'Tam donanımlı ve konforlu araç filosu',
                                'SRC belgeli, psikoteknik testten geçmiş profesyonel sürücüler',
                                '7/24 operasyon ve araç takip desteği',
                                'Zamanında ve güvenli ulaşım garantisi'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                            {STATS.map((stat, index) => (
                                <div key={index} className="text-center md:text-left">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
