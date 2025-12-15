import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Home, MessageSquare, Bus, Map, Image, Star } from 'lucide-react';
import { logout } from './actions';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex relative">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a192f] text-gray-300 flex flex-col fixed top-0 left-0 bottom-0 h-screen z-10 transition-all duration-300">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-white">
                        42<span className="text-blue-500"> Turizm Yönetim Paneli</span>
                    </h1>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span>Panel Özeti</span>
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        İçerik Yönetimi
                    </div>

                    <Link
                        href="/admin/blog"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <FileText size={20} />
                        <span>Blog Yazıları</span>
                    </Link>

                    <Link
                        href="/admin/services"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Briefcase size={20} />
                        <span>Hizmetler</span>
                    </Link>

                    <Link
                        href="/admin/references"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <MessageSquare size={20} />
                        <span>Referanslar</span>
                    </Link>

                    <Link
                        href="/admin/vehicles"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <div className="w-5 h-5 flex items-center justify-center"><Bus size={20} /></div>
                        <span>Araç Filosu</span>
                    </Link>

                    <Link
                        href="/admin/testimonials"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Star size={20} />
                        <span>Müşteri Yorumları</span>
                    </Link>

                    <Link
                        href="/admin/hero"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Image size={20} />
                        <span>Hero Slider</span>
                    </Link>

                    <Link
                        href="/admin/tours"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Map size={20} />
                        <span>Tur Paketleri</span>
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Sistem
                    </div>

                    <Link
                        href="/admin/contact-messages"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <MessageSquare size={20} />
                        <span>Gelen Mesajlar</span>
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Settings size={20} />
                        <span>Genel Ayarlar</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700 mt-auto mb-2 flex gap-2">
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
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
