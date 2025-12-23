'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const [socialMedia, setSocialMedia] = useState({
        instagramUrl: '#',
        facebookUrl: '#',
        linkedinUrl: '#'
    });
    const [contactInfo, setContactInfo] = useState({
        phone1: '+90 555 555 55 55',
        email: 'info@42turizm.com',
        address: 'İstanbul, Türkiye',
        footerText: "İstanbul ve İstanbul'un önde gelen turizm, personel ve öğrenci taşımacılığı firması. Güvenli, konforlu ve zamanında ulaşım çözümleri."
    });
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [logoTimestamp, setLogoTimestamp] = useState(Date.now());

    useEffect(() => {
        async function fetchSocialMedia() {
            try {
                const response = await fetch('/api/settings/social-media');
                const data = await response.json();
                if (data.success && data.data) {
                    setSocialMedia(data.data);
                }
            } catch (error) {
                console.error('Error fetching social media settings:', error);
            }
        }
        fetchSocialMedia();
    }, []);

    useEffect(() => {
        async function fetchLogo() {
            try {
                // Add timestamp to bypass cache
                const response = await fetch(`/api/settings/logo?t=${logoTimestamp}`);
                if (response.ok) {
                    const data = await response.json();
                    setLogoUrl(data.logoUrl);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        }
        fetchLogo();
    }, [logoTimestamp]);

    useEffect(() => {
        async function fetchContactInfo() {
            try {
                const response = await fetch('/api/settings/contact-info');
                const data = await response.json();
                if (data.success && data.data) {
                    setContactInfo({
                        phone1: data.data.phone1 || '+90 555 555 55 55',
                        email: data.data.email || 'info@42turizm.com',
                        address: data.data.address || 'İstanbul, Türkiye',
                        footerText: data.data.footerText || "İstanbul ve İstanbul'un önde gelen turizm, personel ve öğrenci taşımacılığı firması. Güvenli, konforlu ve zamanında ulaşım çözümleri."
                    });
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        }
        fetchContactInfo();
    }, []);

    // Refresh logo every 5 minutes to ensure updates are visible
    useEffect(() => {
        const interval = setInterval(() => {
            setLogoTimestamp(Date.now());
        }, 300000); // 5 minutes

        return () => clearInterval(interval);
    }, []);

    if (isAdmin) return null;

    return (
        <footer className="bg-[#0a192f] text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Company Info */}
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center mb-6">
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt="42 Turizm"
                                    width={200}
                                    height={60}
                                    className="h-16 w-auto object-contain brightness-0 invert opacity-90" // Make it white/monochrome for footer if desired, or keep original. Let's keep original but ensure visibility.
                                    onError={() => setLogoUrl(null)}
                                    unoptimized
                                />
                            ) : <span className="text-3xl font-bold text-white">42<span className="text-[#d4af37]">Turizm</span></span>
                            }
                        </Link>
                        <p className="mb-6 text-gray-400 leading-relaxed">
                            {contactInfo.footerText}
                        </p>
                        <div className="flex gap-4">
                            <a href={socialMedia.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#d4af37] transition-colors text-white"><Instagram size={18} /></a>
                            <a href={socialMedia.facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#d4af37] transition-colors text-white"><Facebook size={18} /></a>
                            <a href={socialMedia.linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#d4af37] transition-colors text-white"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Hızlı Bağlantılar</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Ana Sayfa</Link></li>
                            <li><Link href="/hizmetlerimiz" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Hizmetlerimiz</Link></li>
                            <li><Link href="/kurumsal" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Kurumsal</Link></li>
                            <li><Link href="/iletisim" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> İletişim</Link></li>
                            <li><Link href="/blog" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Blog</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Hizmetlerimiz</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/hizmetlerimiz/servis-tasimaciligi" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Personel Taşımacılığı</Link></li>
                            <li><Link href="/hizmetlerimiz/servis-tasimaciligi" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Öğrenci Taşımacılığı</Link></li>
                            <li><Link href="/hizmetlerimiz/vip-arac-kiralama" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> VIP Transfer</Link></li>
                            <li><Link href="/hizmetlerimiz/turizm-tasimaciligi" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Turizm Taşımacılığı</Link></li>
                            <li><Link href="/hizmetlerimiz/havalimani-transferi" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><ArrowRight size={14} /> Havalimanı Transferi</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">İletişim</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-[#d4af37] mt-1" size={20} />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-[#d4af37]" size={20} />
                                <a href={`tel:${contactInfo.phone1}`} className="hover:text-white transition-colors">{contactInfo.phone1}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-[#d4af37]" size={20} />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/10 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
                        <p>&copy; {new Date().getFullYear()} 42 Turizm. Tüm hakları saklıdır.</p>
                        <a href="https://www.hasandurmus.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors font-medium">Coded by Hasan Durmuş</a>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                        <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
