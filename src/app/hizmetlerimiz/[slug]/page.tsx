import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowRight, Phone, Mail, MapPin, Camera, ArrowLeft } from 'lucide-react';
import { db } from '@/db';
import { services, tours, tourImages, settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function getContactInfo() {
    try {
        const result = await db.select().from(settings).limit(1);
        if (result.length > 0) {
            const data = result[0];
            return {
                phone1: data.phone1 || '+90 555 555 55 55',
                phone2: data.phone2 || '+90 212 222 22 22',
                email: data.email || 'info@42turizm.com'
            };
        }
    } catch (error) {
        console.error('Error fetching contact info:', error);
    }
    return {
        phone1: '+90 555 555 55 55',
        phone2: '+90 212 222 22 22',
        email: 'info@42turizm.com'
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await db.query.services.findFirst({
        where: eq(services.slug, slug)
    });

    if (!service) {
        return {
            title: 'Hizmet Bulunamadı',
        }
    }

    return {
        title: `${service.title} - Hizmetlerimiz`,
        description: service.shortDescription,
    };
}


export default async function ServiceDetailPage({ searchParams, params }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>, params: Promise<{ slug: string }> }) {
    const contactInfo = await getContactInfo();
    const { slug } = await params;
    const { gallery } = await searchParams;

    let service;
    try {
        service = await db.query.services.findFirst({
            where: eq(services.slug, slug)
        });
    } catch (error) {
        console.error('Error fetching service:', error);
        notFound();
    }

    if (!service) {
        notFound();
    }

    // --- Cultural Tours / Gallery Logic ---
    // If this is the "Cultural Tours" page, we fetch the dynamic tours from the DB
    const isCulturalTours = slug === 'kultur-turlari';
    let dbTours: any[] = [];
    let activeTour: any = null;
    let activeTourImages: any[] = [];

    if (isCulturalTours) {
        dbTours = await db.select().from(tours);

        // If query param 'gallery' matches a tour slug or id, fetch its images
        if (gallery && typeof gallery === 'string') {
            // Try to find tour by ID (if numeric) or Slug (if string)
            // Simpler approach for now: assume gallery=ID
            const tourId = parseInt(gallery);
            if (!isNaN(tourId)) {
                activeTour = await db.query.tours.findFirst({ where: eq(tours.id, tourId) });
                if (activeTour) {
                    activeTourImages = await db.select().from(tourImages).where(eq(tourImages.tourId, tourId));
                }
            }
        }
    }


    // If we are in Gallery Mode for Cultural Tours
    if (isCulturalTours && activeTour) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
                {/* Gallery Header */}
                <div className="bg-white shadow-lg sticky top-16 z-40 border-b-2 border-blue-100">
                    <div className="container mx-auto px-8 md:px-16 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <Link href={`/hizmetlerimiz/${slug}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all shadow-md">
                                    <ArrowLeft size={24} className="text-blue-600" />
                                </div>
                                <span className="text-xl font-bold">Turlara Dön</span>
                            </Link>
                            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 rounded-xl mt-3">
                                <Camera className="text-blue-600 flex-shrink-0" size={28} />
                                <h1 className="text-xl font-bold text-gray-900">{activeTour.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="container mx-auto px-4 py-12">
                    {activeTourImages.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                                <Camera className="mx-auto text-gray-300 mb-4" size={64} />
                                <p className="text-gray-500 text-lg">Bu tur için henüz görsel eklenmemiş.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <p className="text-gray-600">
                                    <span className="font-semibold text-blue-600">{activeTourImages.length}</span> fotoğraf
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeTourImages.map((img, index) => (
                                    <div key={img.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={img.imageUrl}
                                                alt={`${activeTour.title} - ${index + 1}`}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <p className="text-white font-medium">Fotoğraf {index + 1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }


    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <Image
                    src={service.imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80'}
                    alt={service.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl animate-fade-in-up delay-100">
                            {service.shortDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Detayları</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                {service.detailedDescription ? (
                                    <div dangerouslySetInnerHTML={{ __html: service.detailedDescription }} />
                                ) : (
                                    <p>Bu hizmetimiz hakkında detaylı bilgi yakında eklenecektir. Şu an için kısa açıklamamız: {service.shortDescription}</p>
                                )}
                            </div>

                            {/* FEATURES LIST */}
                            {service.features && service.features.length > 0 && (
                                <div className="mt-10">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Neden Bizi Tercih Etmelisiniz?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.features.map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                                <div className="bg-green-100 p-2 rounded-full">
                                                    <CheckCircle2 className="text-green-600" size={20} />
                                                </div>
                                                <span className="font-medium text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cultural Tours Special Section: Sub-Tours Grid (NOW DYNAMIC) */}
                        {isCulturalTours && (
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Camera className="text-blue-600" />
                                    Popüler Tur Rotalarımız
                                </h2>

                                {dbTours.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {dbTours.map((pkg) => (
                                            <Link key={pkg.id} href={`/hizmetlerimiz/${slug}?gallery=${pkg.id}`} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300">
                                                <Image
                                                    src={pkg.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'}
                                                    alt={pkg.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                                    <div className="absolute bottom-0 left-0 w-full p-6">
                                                        <h3 className="text-white text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">{pkg.title}</h3>
                                                        <div className="flex items-center gap-2 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                            <Camera size={16} />
                                                            <span>Galeriyi İncele</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                        Henüz aktif tur paketi bulunmamaktadır.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Contact Box */}
                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-6">Hemen Teklif Alın</h3>
                            <p className="text-blue-100 mb-8">
                                Hizmetlerimiz hakkında detaylı bilgi ve size özel fiyat teklifi için bizimle iletişime geçin.
                            </p>

                            <div className="space-y-4">
                                <a href={`tel:${contactInfo.phone1}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                                    <Phone className="text-blue-200" />
                                    <div>
                                        <div className="text-xs text-blue-200">Bizi Arayın</div>
                                        <div className="font-bold">{contactInfo.phone1}</div>
                                    </div>
                                </a>

                                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                                    <Mail className="text-blue-200" />
                                    <div>
                                        <div className="text-xs text-blue-200">E-posta Gönderin</div>
                                        <div className="font-bold">{contactInfo.email}</div>
                                    </div>
                                </a>
                            </div>

                            <Link href="/iletisim" className="mt-8 w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                                İletişim Formu <ArrowRight size={20} />
                            </Link>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center gap-3 mb-4 text-gray-900 border-b pb-4">
                                <MapPin className="text-blue-600" />
                                <h3 className="font-bold">Hizmet Bölgesi</h3>
                            </div>
                            <p className="text-gray-600">
                                {service.serviceArea || 'Konya genelinde ve talep üzerine tüm Türkiye\'de hizmet vermekteyiz.'}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
