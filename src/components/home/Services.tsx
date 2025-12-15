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
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#d4af37]/30"
                        >
                            {/* Image Area */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Floating Icon - Now inside image area for cleaner look */}
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300">
                                    {/* We need to clone the icon to change classes if it's a React Element, 
                                        but for simplicity we'll just wrap it and control color via CSS or let the icon be white */}
                                    <div className="text-white">
                                        {/* This assumes icons passed in are rendered white or inherit colour. 
                                           Since we are replacing the logic, let's just make sure the icon logic above uses appropriate classes.
                                        */}
                                        {React.cloneElement(service.icon as React.ReactElement, { className: "w-7 h-7 text-white" })}
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8">
                                <h4 className="text-xl font-bold text-[#0f172a] mb-4 group-hover:text-[#d4af37] transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                <Link
                                    href={service.link}
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
