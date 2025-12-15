'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2, Landmark } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'Tümü' },
    { id: 'public', label: 'Resmi Kurumlar', icon: Landmark },
    { id: 'private', label: 'Özel Şirketler', icon: Building2 },
];

interface Reference {
    id: number;
    name: string;
    imageUrl: string;
    category: string | null;
}

export default function ReferenceList({ references }: { references: Reference[] }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredRefs = activeCategory === 'all'
        ? references
        : references.filter(r => r.category === activeCategory);

    return (
        <div className="container mx-auto px-4 -mt-8">
            {/* Category Filter */}
            <div className="bg-white p-4 rounded-xl shadow-lg flex flex-wrap justify-center gap-4 mb-12">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeCategory === cat.id
                            ? 'bg-[#d4af37] text-white shadow-md'
                            : 'bg-gray-100 text-[#0f172a] hover:bg-gray-200'
                            }`}
                    >
                        {cat.icon && <cat.icon size={18} />}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* References Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRefs.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Bu kategoride henüz referans eklenmemiş.
                    </div>
                ) : (
                    filteredRefs.map((ref) => (
                        <div
                            key={ref.id}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center justify-center text-center group hover:border-[#d4af37]/30"
                        >
                            <div className="relative w-full aspect-[3/2] mb-4 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                {ref.imageUrl ? (
                                    <Image
                                        src={ref.imageUrl}
                                        alt={ref.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                                        <Building2 className="text-gray-300" size={32} />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-semibold text-[#0f172a]">{ref.name}</h3>
                            <span className="text-xs text-[#d4af37] font-bold mt-1 uppercase tracking-wide">
                                {CATEGORIES.find(c => c.id === ref.category)?.label || 'Genel'}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
