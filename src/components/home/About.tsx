'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Users, Calendar, Award } from 'lucide-react';

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

    useEffect(() => {
        async function fetchAboutData() {
            try {
                const response = await fetch('/api/settings/contact-info');
                const data = await response.json();
                if (data.success && data.data && data.data.aboutText) {
                    // Parse the about text to extract features if needed
                    const text = data.data.aboutText;

                    // Try to extract features from the text (simple approach)
                    const featureLines = text.match(/• (.*?)(?=\n•|\n\n|$)/g) || [];
                    const extractedFeatures = featureLines.map((f: string) => f.replace('• ', '').trim());

                    if (extractedFeatures.length > 0) {
                        setFeatures(extractedFeatures.slice(0, 4));
                    }

                    // Set the about text (first paragraph)
                    const firstParagraph = text.split('\n\n')[0] || text;
                    setAboutText(firstParagraph);
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        }
        fetchAboutData();
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={aboutImageUrl}
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
                            {aboutText}
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
                            {stats.map((stat, index) => (
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
