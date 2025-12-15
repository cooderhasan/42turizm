'use client';

import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    title: string;
    content: string;
    rating: number;
    imageUrl: string;
    isActive: boolean;
}

export default function Testimonials() {
    const [emblaRef] = useEmblaCarousel({ align: 'start', loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const response = await fetch('/api/testimonials');
                if (response.ok) {
                    const data = await response.json();
                    setTestimonials(data);
                } else {
                    throw new Error('Failed to fetch testimonials');
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError('Yorumlar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonials();
    }, []);

    // Fallback data if API fails or no testimonials exist
    const fallbackTestimonials = [
        {
            id: 1,
            name: 'Ahmet Yılmaz',
            title: 'İK Müdürü, Tech Corp',
            content: 'Personel taşımacılığında 3 yıldır 42 Turizm ile çalışıyoruz. Dakiklikleri ve araç temizlikleri konusunda çok titizler. Kesinlikle tavsiye ederim.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'Ayşe Demir',
            title: 'Okul Müdürü, Bilgi Koleji',
            content: 'Öğrenci servislerimiz için güvenilir bir ortak arıyorduk. Araç takip sistemleri ve rehber personelin ilgisi velilerimizi çok memnun etti.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop'
        },
        {
            id: 3,
            name: 'Mehmet Öztürk',
            title: 'Operasyon Müdürü, Lojistik A.Ş.',
            content: 'VIP transfer hizmetlerini yurt dışı misafirlerimiz için kullanıyoruz. Araçlar son model ve şoförler çok profesyonel. Teşekkürler.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
        },
        {
            id: 4,
            name: 'Zeynep Kaya',
            title: 'Etkinlik Organizatörü',
            content: 'Büyük çaplı organizasyonlarımızda ulaşım sponsorumuz 42 Turizm. Esnek çözümleri ve kriz anındaki hızlı aksiyonları hayat kurtarıcı.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
        }
    ];

    const activeTestimonials = testimonials.length > 0 ? testimonials.filter(t => t.isActive) : fallbackTestimonials;

    if (loading) {
        return (
            <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-300 font-semibold tracking-wide uppercase text-sm mb-3">Müşteri Yorumları</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Sizden Gelen Geri Bildirimler</h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        console.warn(error);
    }

    return (
        <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-[#d4af37] font-semibold tracking-wide uppercase text-sm mb-3">Müşteri Yorumları</h2>
                    <h3 className="text-4xl font-bold mb-6">Müşterilerimiz Ne Diyor?</h3>
                    <p className="text-gray-300 text-lg">
                        Hizmet verdiğimiz kurum ve kuruluşların hakkımızdaki düşünceleri bizim için en büyük referanstır.
                    </p>
                </div>

                <div className="relative w-full mx-auto">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {activeTestimonials.map((review) => (
                                <div key={review.id} className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4 min-w-0">
                                    <div className="bg-[#1e293b] p-8 rounded-2xl relative h-full border border-gray-800 hover:border-[#d4af37]/30 transition-colors group">
                                        <Quote className="text-[#d4af37] w-10 h-10 mb-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        <p className="text-gray-300 mb-8 leading-relaxed italic">
                                            "{review.content}"
                                        </p>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4af37]">
                                                {/* Placeholder for user image if needed, or keeping it distinct */}
                                                <div className="bg-gray-700 w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">
                                                    {review.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{review.name}</h4>
                                                <span className="text-sm text-[#d4af37]/80">{review.title}</span>
                                            </div>
                                            <div className="ml-auto flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
