import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/db';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'Hizmetlerimiz - 42 Turizm',
    description: '42 Turizm olarak sunduğumuz tüm hizmetlerimizi keşfedin. Konforlu ve güvenli ulaşım çözümleri.',
};

interface Service {
    id: number;
    title: string;
    slug: string;
    shortDescription: string | null;
    imageUrl: string | null;
    features: string[] | null;
    isActive: boolean | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    detailedDescription: string | null;
    iconName: string | null;
}

export default async function ServicesPage() {
    let servicesList: Service[] = [];
    try {
        servicesList = await db.query.services.findMany({
            where: eq(services.isActive, true),
            orderBy: (services, { asc }) => [asc(services.order)],
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        servicesList = [];
    }

    // Fallback services if none in DB
    const fallbackServices: Service[] = [
        {
            id: 1,
            title: 'Özel Transfer Hizmetleri',
            slug: 'ozel-transfer',
            shortDescription: 'Havaalanı, otel ve özel adresler arasında VIP transfer hizmetleri.',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2072&auto=format&fit=crop',
            features: ['VIP araçlar', 'Profesyonel şoförler', '7/24 hizmet', 'Güvenli ve konforlu'],
            isActive: true,
            order: 1,
            createdAt: null,
            updatedAt: null,
            detailedDescription: null,
            iconName: null
        },
        {
            id: 2,
            title: 'Kurumsal Taşımacılık',
            slug: 'kurumsal-tasimacilik',
            shortDescription: 'Şirketleriniz için özel çözümler ve uzun dönemli taşımacılık hizmetleri.',
            imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
            features: ['Esnek sözleşmeler', 'Filomuzda 50+ araç', 'GPS takip sistemi', 'Sigortalı hizmet'],
            isActive: true,
            order: 2,
            createdAt: null,
            updatedAt: null,
            detailedDescription: null,
            iconName: null
        },
        {
            id: 3,
            title: 'Kültür Turlari',
            slug: 'kultur-turlari',
            shortDescription: 'İstanbul ve çevresinde kültürel ve tarihi turlar düzenliyoruz.',
            imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=2070&auto=format&fit=crop',
            features: ['Uzman rehberler', 'Özel tur rotaları', 'Konforlu araçlar', 'Küçük gruplar'],
            isActive: true,
            order: 3,
            createdAt: null,
            updatedAt: null,
            detailedDescription: null,
            iconName: null
        }
    ];

    const displayServices: Service[] = servicesList.length > 0 ? servicesList : fallbackServices;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] bg-[#0f172a]">
                <Image
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                    alt="Hizmetlerimiz"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-transparent flex items-center">
                    <div className="container mx-auto px-4 text-center md:text-left text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                            Hizmetlerimiz
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl text-gray-300 animate-fade-in-up delay-100">
                            Güvenli, konforlu ve profesyonel ulaşım çözümleri ile yanınızdayız.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-[#d4af37]/30">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.imageUrl || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop'}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                            </div>

                            <div className="p-8 relative">
                                <h2 className="text-2xl font-bold text-[#0f172a] mb-3 group-hover:text-[#d4af37] transition-colors">{service.title}</h2>
                                <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                                {service.features && service.features.length > 0 && (
                                    <div className="space-y-3 mb-8">
                                        {service.features.slice(0, 3).map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3 text-gray-700">
                                                <CheckCircle2 className="text-[#d4af37]" size={18} />
                                                <span className="text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                        {service.features.length > 3 && (
                                            <div className="text-sm text-gray-500 ml-6">
                                                +{service.features.length - 3} daha fazla özellik
                                            </div>
                                        )}
                                    </div>
                                )}

                                <Link
                                    href={`/hizmetlerimiz/${service.slug}`}
                                    className="w-full bg-[#0f172a] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                                >
                                    Detayları Görüntüle <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#0f172a] text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Size Özel Çözümler</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        İhtiyaçlarınıza özel taşımacılık çözümleri için bizimle iletişime geçin.
                    </p>
                    <Link
                        href="/iletisim"
                        className="bg-[#d4af37] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#0f172a] transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Hemen Teklif Alın <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}