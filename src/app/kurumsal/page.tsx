import React from 'react';
import Image from 'next/image';
import { Target, Lightbulb, Users } from 'lucide-react';
import { db } from '@/db';
import { settings } from '@/db/schema';

export const metadata = {
    title: 'Kurumsal | 42 Turizm',
    description: '42 Turizm hakkında, misyonumuz ve vizyonumuz.',
};

export default async function CorporatePage() {
    let settingsData;
    try {
        settingsData = await db.query.settings.findFirst();
    } catch (error) {
        console.error('Error fetching settings:', error);
        settingsData = null;
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#0a192f] text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">42 Turizm olarak, güvenli ve konforlu ulaşım çözümleri sunuyoruz.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10">
                {/* Main About Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 max-w-5xl mx-auto border border-gray-100">
                    <h2 className="text-3xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                        <Users className="text-[#d4af37]" /> Biz Kimiz?
                    </h2>
                    <div className="prose prose-lg text-gray-700 max-w-none prose-headings:text-[#0f172a] prose-a:text-[#d4af37]">
                        <div dangerouslySetInnerHTML={{ __html: settingsData?.aboutText || 'İçerik hazırlanıyor...' }} />
                    </div>
                </div>

                {/* Mission & Vision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Mission */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#d4af37]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] mb-6 group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                            <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Misyonumuz</h3>
                        <div className="prose prose-gray text-gray-700">
                            <div dangerouslySetInnerHTML={{ __html: settingsData?.missionText || 'Misyon bilgisi girilmemiş.' }} />
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#d4af37]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#0f172a]/10 rounded-full flex items-center justify-center text-[#0f172a] mb-6 group-hover:bg-[#0f172a] group-hover:text-white transition-colors">
                            <Lightbulb size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Vizyonumuz</h3>
                        <div className="prose prose-gray text-gray-700">
                            <div dangerouslySetInnerHTML={{ __html: settingsData?.visionText || 'Vizyon bilgisi girilmemiş.' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
