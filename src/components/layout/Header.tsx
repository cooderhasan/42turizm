'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Menu, X, Instagram, Facebook, Linkedin, ChevronDown, Bus, Map, Plane, Car, Key, Shield, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const SERVICES_MENU = [
    {
        title: 'Servis Taşımacılığı',
        href: '/hizmetlerimiz/servis-tasimaciligi',
        description: 'Fabrikalar, şirketler ve kurumlar için güvenli personel taşımacılığı.',
        icon: Bus
    },
    {
        title: 'Kültür Turları',
        href: '/hizmetlerimiz/kultur-turlari',
        description: "Türkiye'nin eşsiz güzelliklerini profesyonel rehberlerle keşfedin.",
        icon: Map
    },
    {
        title: 'Turizm Taşımacılığı',
        href: '/hizmetlerimiz/turizm-tasimaciligi',
        description: 'Yurt içi ve yurt dışı kültür turları, özel geziler için araç temini.',
        icon: Globe
    },
    {
        title: 'Havalimanı Transferi',
        href: '/hizmetlerimiz/havalimani-transferi',
        description: 'Konya Havalimanı başta olmak üzere tüm havalimanlarına VIP transfer.',
        icon: Plane
    },
    {
        title: 'Sürücülü VIP Araç',
        href: '/hizmetlerimiz/vip-arac-kiralama',
        description: 'Özel misafirleriniz ve protokol taşımacılığı için VIP araç kiralama.',
        icon: Car
    },
    {
        title: 'Filo Kiralama',
        href: '/hizmetlerimiz/filo-kiralama',
        description: 'Şirketinizin ihtiyaç duyduğu binek ve ticari araç filosu çözümleri.',
        icon: Key
    },
    {
        title: 'Güvenlik & Temizlik',
        href: '/hizmetlerimiz/guvenlik-temizlik',
        description: 'Tesisleriniz için entegre tesis yönetim hizmetleri sunuyoruz.',
        icon: Shield
    },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [socialMedia, setSocialMedia] = useState({
        instagramUrl: '#',
        facebookUrl: '#',
        linkedinUrl: '#'
    });
    const [contactInfo, setContactInfo] = useState({
        phone1: '+90 555 555 55 55',
        email: 'info@42turizm.com'
    });
    const [logoTimestamp, setLogoTimestamp] = useState(Date.now());
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                        email: data.data.email || 'info@42turizm.com'
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

    // Verify if we are in admin panel
    const isAdmin = pathname?.startsWith('/admin');

    // Determine header style: Transparent only on Home when not scrolled
    const isTransparent = isHome && !isScrolled;

    if (isAdmin) return null;

    return (
        <header className="fixed w-full z-50 transition-all duration-300">
            {/* Top Bar - Hidden on Mobile */}
            <div className={`hidden md:block w-full bg-[#0a192f] text-gray-300 text-xs py-2 transition-all duration-300 ${!isTransparent ? 'h-0 overflow-hidden opacity-0' : 'h-10 opacity-100'}`}>
                <div className="container mx-auto px-4 h-full flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href={`tel:${contactInfo.phone1}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone size={14} /> <span>{contactInfo.phone1}</span>
                        </a>
                        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={14} /> <span>{contactInfo.email}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-300">Bizi takip edin:</span>
                        <div className="flex gap-3">
                            <a href={socialMedia.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-300 hover:scale-110">
                                <Instagram size={16} className="hover:text-white" />
                            </a>
                            <a href={socialMedia.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-300 hover:scale-110">
                                <Facebook size={16} className="hover:text-white" />
                            </a>
                            <a href={socialMedia.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-300 hover:scale-110">
                                <Linkedin size={16} className="hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className={`w-full transition-all duration-300 border-b border-white/10 ${!isTransparent
                ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-gray-800'
                : 'bg-transparent py-5 text-white'
                }`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight flex items-center">
                        {logoUrl ? (
                            <Image src={logoUrl} alt="42 Turizm" width={200} height={60} className="h-12 w-auto" />
                        ) : (
                            <span className="text-3xl font-bold">42<span className="text-blue-600">Turizm</span></span>
                        )}
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 font-medium">
                        <Link href="/" className="hover:text-[#d4af37] transition-colors">Ana Sayfa</Link>

                        {/* Dropdown Container */}
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setIsServiceDropdownOpen(true)}
                            onMouseLeave={() => setIsServiceDropdownOpen(false)}
                        >
                            <button className="flex items-center gap-1 hover:text-[#d4af37] transition-colors py-4">
                                Hizmetlerimiz <ChevronDown size={14} />
                            </button>

                            {/* Dropdown Menu - Modern Redesign */}
                            <div className={`absolute top-full -left-16 w-[700px] bg-white shadow-xl rounded-xl transition-all duration-200 transform origin-top-left border border-gray-100 overflow-hidden ${isServiceDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'
                                }`}>
                                <div className="p-6 grid grid-cols-2 gap-4">
                                    {SERVICES_MENU.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item"
                                            >
                                                <div className="p-2.5 bg-gray-100 rounded-lg text-gray-600 group-hover/item:bg-[#d4af37]/10 group-hover/item:text-[#d4af37] transition-colors">
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-[#d4af37] transition-colors mb-0.5">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 font-normal leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="bg-gray-50 p-4 border-t border-gray-100">
                                    <Link href="/iletisim" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 hover:text-[#d4af37] transition-colors uppercase tracking-wide">
                                        Özel talepleriniz için bize ulaşın <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/arac-filomuz" className="hover:text-[#d4af37] transition-colors">Araç Filomuz</Link>
                        <Link href="/referanslar" className="hover:text-[#d4af37] transition-colors">Referanslar</Link>
                        <Link href="/blog" className="hover:text-[#d4af37] transition-colors">Blog</Link>
                        <Link href="/kurumsal" className="hover:text-[#d4af37] transition-colors">Kurumsal</Link>
                        <Link href="/iletisim" className="hover:text-[#d4af37] transition-colors">İletişim</Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            href="/iletisim"
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 ${isScrolled
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-white text-blue-900 hover:bg-gray-100'
                                }`}
                        >
                            Teklif Alın
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-white text-gray-800 shadow-xl border-t border-gray-100 p-6 md:hidden flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                    <Link href="/" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>

                    {/* Mobile Submenu */}
                    <div className="border-b border-gray-100 pb-2">
                        <div className="font-semibold py-2 text-gray-900">Hizmetlerimiz</div>
                        <div className="pl-4 flex flex-col gap-2 mt-1">
                            {SERVICES_MENU.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-sm text-gray-600 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/arac-filomuz" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Araç Filomuz</Link>
                    <Link href="/referanslar" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Referanslar</Link>
                    <Link href="/blog" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                    <Link href="/kurumsal" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Kurumsal</Link>
                    <Link href="/iletisim" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
                    <Link
                        href="/iletisim"
                        className="mt-4 bg-blue-600 text-white py-3 rounded-lg text-center font-semibold"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Teklif Alın
                    </Link>
                </div>
            )}
        </header>
    );
}
