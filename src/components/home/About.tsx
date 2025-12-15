'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Users, Calendar, Award, ArrowRight } from 'lucide-react';

const DEFAULT_STATS = [
    { label: 'Yıllık Tecrübe', value: '15+', icon: Calendar },
    { label: 'Mutlu Müşteri', value: '10k+', icon: Users },
    { label: 'Araç Filosu', value: '50+', icon: Award },
];

export default function About() {
    const [aboutText, setAboutText] = useState('42 Turizm olarak, 2008 yılından bu yana taşımacılık sektöründe güven ve kaliteyi bir araya getiriyoruz. Modern araç filomuz, deneyimli sürücü kadromuz ve teknolojik altyapımızla personel taşımacılığı, öğrenci servis hizmetleri ve VIP transfer çözümleri sunuyoruz.');
    const [features, setFeatures] = useState([
        'Tam donanımlı ve konforlu araç filosu',
        'SRC belgeli, psikoteknik testten geçmiş profesyonel sürücüler',
        '7/24 operasyon ve araç takip desteği',
        'Zamanında ve güvenli ulaşım garantisi'
    ]);
    const [aboutImageUrl, setAboutImageUrl] = useState('https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop');
    const [stats, setStats] = useState(DEFAULT_STATS);

    useEffect(() => {
        async function fetchAboutData() {
            try {
                const response = await fetch('/api/settings/contact-info');
                const data = await response.json();
                if (data.success && data.data) {
                    // Parse the about text to extract features if needed
                    const text = data.data.aboutText;

                    // Try to extract features from the text (simple approach)
                    const featureLines = text ? text.match(/• (.*?)(?=\n•|\n\n|$)/g) || [] : [];
                    const extractedFeatures = featureLines.map((f: string) => f.replace('• ', '').trim());

                    if (extractedFeatures.length > 0) {
                        setFeatures(extractedFeatures.slice(0, 4));
                    }

                    // Set the about text (first paragraph)
                    const firstParagraph = text ? text.split('\n\n')[0] || text : '42 Turizm olarak, 2008 yılından bu yana taşımacılık sektöründe güven ve kaliteyi bir araya getiriyoruz. Modern araç filomuz, deneyimli sürücü kadromuz ve teknolojik altyapımızla personel taşımacılığı, öğrenci servis hizmetleri ve VIP transfer çözümleri sunuyoruz.';
                    // Remove HTML tags from the text (more comprehensive cleaning)
                    const cleanText = firstParagraph
                        .replace(/<[^>]*>/g, '') // Remove all HTML tags
                        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
                        .replace(/&/g, '&') // Replace & with &
                        .replace(/</g, '<') // Replace < with <
                        .replace(/>/g, '>') // Replace > with >
                        .replace(/"/g, '"') // Replace " with "
                        .replace(/'/g, "'") // Replace ' with '
                        .trim();
                    setAboutText(cleanText);

                    // Set image and stats if available
                    if (data.data.aboutImageUrl) {
                        setAboutImageUrl(data.data.aboutImageUrl);
                    }

                    // Set stats if available
                    if (data.data.stat1Label && data.data.stat1Value) {
                        const customStats = [
                            {
                                label: data.data.stat1Label,
                                value: data.data.stat1Value,
                                icon: Calendar
                            },
                            {
                                label: data.data.stat2Label || DEFAULT_STATS[1].label,
                                value: data.data.stat2Value || DEFAULT_STATS[1].value,
                                icon: Users
                            },
                            {
                                label: data.data.stat3Label || DEFAULT_STATS[2].label,
                                value: data.data.stat3Value || DEFAULT_STATS[2].value,
                                icon: Award
                            }
                        ];
                        setStats(customStats);
                    }
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        }
        fetchAboutData();
    }, []);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-32 z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                            <Image
                                src={aboutImageUrl}
                                alt="42 Turizm Filo"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0f172a]/10 mix-blend-multiply" />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#d4af37] rounded-full flex flex-col items-center justify-center text-white hidden md:flex border-8 border-white shadow-xl z-20">
                            <span className="text-5xl font-bold">{stats[0].value}</span>
                            <span className="text-sm uppercase tracking-wider font-semibold">Yıllık Tecrübe</span>
                        </div>
                        {/* Decorative Dot Grid */}
                        <div className="absolute -top-10 -left-10 z-[-1]">
                            <div className="grid grid-cols-5 gap-2">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-[#d4af37]/20" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:pl-8">
                        <h4 className="text-[#d4af37] font-bold uppercase tracking-widest mb-4">Hakkımızda</h4>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
                            Güvenli ve Konforlu <br /> <span className="text-[#d4af37]">Yolculuğun Adresi</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            {aboutText}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {features.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/kurumsal"
                            className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1e293b] transition-all transform hover:scale-105 shadow-xl shadow-[#0f172a]/20"
                        >
                            Daha Fazla Bilgi <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
