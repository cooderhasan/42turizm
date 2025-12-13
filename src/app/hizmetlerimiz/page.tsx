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
            <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-blue-600 to-purple-700">
                <Image
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                    alt="Hizmetlerimiz"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                            Hizmetlerimiz
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in-up delay-100">
                            Güvenli, konforlu ve profesyonel ulaşım çözümleri ile yanınızdayız.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.imageUrl || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop'}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            </div>

                            <div className="p-8 relative">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                                <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                                {service.features && service.features.length > 0 && (
                                    <div className="space-y-3 mb-8">
                                        {service.features.slice(0, 3).map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3 text-gray-700">
                                                <CheckCircle2 className="text-green-600" size={18} />
                                                <span className="text-sm">{feature}</span>
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
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Detayları Görüntüle <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Size Özel Çözümler</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        İhtiyaçlarınıza özel taşımacılık çözümleri için bizimle iletişime geçin.
                    </p>
                    <Link
                        href="/iletisim"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                    >
                        Hemen Teklif Alın <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}