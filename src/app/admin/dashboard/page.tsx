import { db } from '@/db';
import { vehicles, blogPosts, services, references, tours, heroSlides } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { Bus, FileText, Briefcase, MessageSquare, Map, Image, TrendingUp, Activity } from 'lucide-react';

async function getDashboardStats() {
    const [vehicleCount] = await db.select({ count: sql<number>`count(*)` }).from(vehicles);
    const [blogCount] = await db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    const [serviceCount] = await db.select({ count: sql<number>`count(*)` }).from(services);
    const [referenceCount] = await db.select({ count: sql<number>`count(*)` }).from(references);
    const [tourCount] = await db.select({ count: sql<number>`count(*)` }).from(tours);
    const [heroCount] = await db.select({ count: sql<number>`count(*)` }).from(heroSlides);

    return {
        vehicles: Number(vehicleCount.count),
        blogs: Number(blogCount.count),
        services: Number(serviceCount.count),
        references: Number(referenceCount.count),
        tours: Number(tourCount.count),
        heroSlides: Number(heroCount.count),
    };
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    const cards = [
        {
            title: 'Araç Filosu',
            value: stats.vehicles,
            icon: Bus,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            link: '/admin/vehicles'
        },
        {
            title: 'Blog Yazıları',
            value: stats.blogs,
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            link: '/admin/blog'
        },
        {
            title: 'Hizmetler',
            value: stats.services,
            icon: Briefcase,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
            link: '/admin/services'
        },
        {
            title: 'Referanslar',
            value: stats.references,
            icon: MessageSquare,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            link: '/admin/references'
        },
        {
            title: 'Tur Paketleri',
            value: stats.tours,
            icon: Map,
            color: 'from-pink-500 to-pink-600',
            bgColor: 'bg-pink-50',
            iconColor: 'text-pink-600',
            link: '/admin/tours'
        },
        {
            title: 'Hero Slider',
            value: stats.heroSlides,
            icon: Image,
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            link: '/admin/hero'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
                <div className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                            <Activity className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Panel Özeti</h1>
                            <p className="text-gray-500 mt-1">Sistemdeki tüm verilerin özet görünümü</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <a
                                key={index}
                                href={card.link}
                                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>

                                <div className="p-6 relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                                                {card.title}
                                            </p>
                                            <div className="flex items-baseline gap-2">
                                                <h3 className="text-4xl font-bold text-gray-900">
                                                    {card.value}
                                                </h3>
                                                <span className="text-sm text-gray-400">adet</span>
                                            </div>
                                        </div>

                                        <div className={`p-4 ${card.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={card.iconColor} size={28} />
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500">Yönetim Paneline Git</span>
                                            <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                            <TrendingUp className="text-white" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Hızlı İşlemler</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a
                            href="/admin/blog"
                            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                        >
                            <FileText className="text-purple-600" size={24} />
                            <span className="font-medium text-gray-700 group-hover:text-purple-700">Yeni Blog Yazısı</span>
                        </a>

                        <a
                            href="/admin/vehicles"
                            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                        >
                            <Bus className="text-blue-600" size={24} />
                            <span className="font-medium text-gray-700 group-hover:text-blue-700">Araç Ekle</span>
                        </a>

                        <a
                            href="/admin/services"
                            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                        >
                            <Briefcase className="text-green-600" size={24} />
                            <span className="font-medium text-gray-700 group-hover:text-green-700">Hizmet Ekle</span>
                        </a>

                        <a
                            href="/admin/settings"
                            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                        >
                            <svg className="text-gray-600" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium text-gray-700 group-hover:text-gray-900">Site Ayarları</span>
                        </a>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Hoş Geldiniz! 👋</h2>
                    <p className="text-blue-100 text-lg">
                        42 Turizm yönetim paneline hoş geldiniz. Sol menüden istediğiniz bölüme geçiş yapabilir,
                        yukarıdaki istatistik kartlarına tıklayarak ilgili yönetim sayfasına gidebilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
}
