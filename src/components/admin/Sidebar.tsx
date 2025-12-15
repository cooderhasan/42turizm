'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Bus, Map, Image, Star, Settings, LogOut, Home, Menu, X, Shield, Lock } from 'lucide-react';
import { logout } from '@/app/admin/actions';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const menuItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Panel Özeti' },
        { header: 'İçerik Yönetimi' },
        { href: '/admin/blog', icon: FileText, label: 'Blog Yazıları' },
        { href: '/admin/services', icon: Briefcase, label: 'Hizmetler' },
        { href: '/admin/references', icon: MessageSquare, label: 'Referanslar' },
        { href: '/admin/vehicles', icon: Bus, label: 'Araç Filosu' },
        { href: '/admin/testimonials', icon: Star, label: 'Müşteri Yorumları' },
        { href: '/admin/hero', icon: Image, label: 'Hero Slider' },
        { href: '/admin/tours', icon: Map, label: 'Tur Paketleri' },
        { header: 'Sistem' },
        { href: '/admin/contact-messages', icon: MessageSquare, label: 'Gelen Mesajlar' },
        { href: '/admin/settings', icon: Settings, label: 'Genel Ayarlar' },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0a192f] text-white z-50 px-4 py-3 flex items-center justify-between shadow-md">
                <span className="font-bold text-lg">42 Turizm Admin</span>
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-white/10">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0a192f] text-gray-300 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:h-screen
            `}>
                <div className="p-6 border-b border-gray-700 hidden md:block">
                    <h1 className="text-2xl font-bold text-white">
                        42<span className="text-blue-500"> Turizm</span>
                    </h1>
                </div>

                <div className="md:hidden p-6 border-b border-gray-700 bg-[#0a192f] mt-12">
                    <h1 className="text-2xl font-bold text-white">42 Turizm</h1>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        item.header ? (
                            <div key={index} className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {item.header}
                            </div>
                        ) : (
                            <Link
                                key={index}
                                href={item.href || '#'}
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {item.icon && <item.icon size={20} />}
                                <span>{item.label}</span>
                            </Link>
                        )
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700 mt-auto bg-[#0a192f]">
                    <div className="flex gap-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex-1 flex justify-center items-center gap-2 px-2 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-sm"
                        >
                            <Home size={18} />
                            <span className="truncate">Siteye Git</span>
                        </Link>

                        <form action={logout} className="flex-1">
                            <button type="submit" className="w-full flex justify-center items-center gap-2 px-2 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm">
                                <LogOut size={18} />
                                <span className="truncate">Çıkış</span>
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    );
}
