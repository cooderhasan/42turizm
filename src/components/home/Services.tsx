'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bus, Map, Plane, Car, Building2, ShieldCheck, Phone } from 'lucide-react';

const SERVICES = [
    {
        id: 1,
        title: 'Servis Taşımacılığı',
        description: 'Personel ve öğrenci taşımacılığında güvenli, zamanında ve konforlu ulaşım çözümleri sunuyoruz.',
        icon: <Bus className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        link: '/hizmetlerimiz/servis-tasimaciligi'
    },
    {
        id: 2,
        title: 'Kültür Turları',
        description: 'Tarihi ve doğal güzellikleri keşfetmeniz için yurt içi ve yurt dışı kültür turları düzenliyoruz.',
        icon: <Map className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
        link: '/hizmetlerimiz/kultur-turlari'
    },
    {
        id: 3,
        title: 'Turizm Taşımacılığı',
        description: 'Turistik geziler, bayi toplantıları ve organizasyonlar için geniş araç filomuzla hizmetinizdeyiz.',
        icon: <Bus className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
        link: '/hizmetlerimiz/turizm-tasimaciligi'
    },
    {
        id: 4,
        title: 'Havalimanı Transferi',
        description: 'Havalimanından evinize veya otelinize, zamanında ve konforlu transfer hizmeti.',
        icon: <Plane className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
        link: '/hizmetlerimiz/havalimani-transferi'
    },
    {
        id: 5,
        title: 'Sürücülü VIP Araç',
        description: 'Özel günleriniz ve iş seyahatleriniz için protokol deneyimine sahip sürücülerimizle VIP hizmet.',
        icon: <Car className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop',
        link: '/hizmetlerimiz/vip-arac-kiralama'
    },
    {
        id: 6,
        title: 'Filo Kiralama',
        description: 'Şirketinizin ihtiyaç duyduğu binek ve ticari araçları uzun dönem kiralama avantajlarıyla sunuyoruz.',
        icon: <Building2 className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
        link: '/hizmetlerimiz/filo-kiralama'
    },
    {
        id: 7,
        title: 'Güvenlik & Temizlik',
        description: 'Tesisleriniz için entegre tesis yönetimi, profesyonel güvenlik ve temizlik hizmetleri.',
        icon: <ShieldCheck className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />,
        image: 'https://images.unsplash.com/photo-1581578731117-10d52143b1e8?q=80&w=2070&auto=format&fit=crop',
        link: '/hizmetlerimiz/guvenlik-temizlik'
    }
];

export default function Services() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Hizmetlerimiz</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sizin İçin Neler Yapıyoruz?</h3>
                    <p className="text-gray-600 text-lg">
                        42 Turizm olarak, sadece taşımacılık değil, kurumsal ihtiyaçlarınıza yönelik geniş bir hizmet yelpazesi sunuyoruz.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content Area */}
                            <div className="p-8 relative">
                                {/* Floating Icon */}
                                <div className="absolute -top-10 right-6 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 transform rotate-3 group-hover:rotate-6">
                                    {service.icon}
                                </div>

                                <h4 className="text-xl font-bold text-gray-900 mb-4 pt-4 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    {service.description}
                                </p>

                                <Link
                                    href={service.link}
                                    className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform"
                                >
                                    Detaylı İncele <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Contact Box for "Special Requests" */}
                    <div className="bg-blue-600 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center text-white min-h-[400px]">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <Phone className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold mb-4">Özel Talepleriniz İçin</h4>
                        <p className="opacity-90 mb-8">
                            Listelenen hizmetler dışında özel kurumsal talepleriniz mi var? Bize ulaşın, size özel çözümler üretelim.
                        </p>
                        <Link
                            href="/iletisim"
                            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                        >
                            Bize Ulaşın
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
