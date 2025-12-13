'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        address: 'İstanbul, Türkiye'
    });

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
        async function fetchContactInfo() {
            try {
                const response = await fetch('/api/settings/contact-info');
                const data = await response.json();
                if (data.success && data.data) {
                    setContactInfo({
                        phone1: data.data.phone1 || '+90 555 555 55 55',
                        email: data.data.email || 'info@42turizm.com',
                        address: data.data.address || 'İstanbul, Türkiye'
                    });
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        }
        fetchContactInfo();
    }, []);

    if (isAdmin) return null;

    return (
        <footer className="bg-[#0a192f] text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Company Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">42<span className="text-blue-500">Turizm</span></h2>
                        <p className="mb-6 text-gray-400 leading-relaxed">
                            Konforlu ve güvenli yolculuklarınız için modern araç filomuz ve profesyonel ekibimizle hizmetinizdeyiz.
                        </p>
                        <div className="flex gap-4">
                            <a href={socialMedia.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors text-white"><Instagram size={18} /></a>
                            <a href={socialMedia.facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors text-white"><Facebook size={18} /></a>
                            <a href={socialMedia.linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors text-white"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Hızlı Erişim</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Ana Sayfa</Link></li>
                            <li><Link href="/hizmetlerimiz" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Hizmetlerimiz</Link></li>
                            <li><Link href="/kurumsal" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Kurumsal</Link></li>
                            <li><Link href="/iletisim" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> İletişim</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Hizmetlerimiz</h3>
                        <ul className="space-y-3">
                            <li><Link href="/hizmetlerimiz/servis-tasimaciligi" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Personel Taşımacılığı</Link></li>
                            <li><Link href="/hizmetlerimiz/kultur-turlari" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Öğrenci Taşımacılığı</Link></li>
                            <li><Link href="/hizmetlerimiz/vip-arac-kiralama" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> VIP Transfer</Link></li>
                            <li><Link href="/hizmetlerimiz/turizm-tasimaciligi" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Turizm Taşımacılığı</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">İletişim</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-blue-500 mt-1" size={20} />
                                <span>{contactInfo.address}<br />Merkez Ofis</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-blue-500" size={20} />
                                <a href={`tel:${contactInfo.phone1}`} className="hover:text-white">{contactInfo.phone1}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-blue-500" size={20} />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/10 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} 42 Turizm. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                        <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
