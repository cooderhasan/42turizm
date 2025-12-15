import { db } from '@/db';
import { vehicles, blogPosts, services, references, tours, heroSlides, testimonials, contactMessages } from '@/db/schema';
import { sql, desc } from 'drizzle-orm';
import { Bus, FileText, Briefcase, MessageSquare, Map, Image, TrendingUp, Activity, Star, Settings, Clock, CheckCircle, XCircle } from 'lucide-react';

async function getDashboardStats() {
    const [vehicleCount] = await db.select({ count: sql<number>`count(*)` }).from(vehicles);
    const [blogCount] = await db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    const [serviceCount] = await db.select({ count: sql<number>`count(*)` }).from(services);
    const [referenceCount] = await db.select({ count: sql<number>`count(*)` }).from(references);
    const [tourCount] = await db.select({ count: sql<number>`count(*)` }).from(tours);
    const [heroCount] = await db.select({ count: sql<number>`count(*)` }).from(heroSlides);
    const [testimonialCount] = await db.select({ count: sql<number>`count(*)` }).from(testimonials);

    const recentMsgs = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(5);
    const recentBlogs = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(5);

    return {
        counts: {
            vehicles: Number(vehicleCount.count),
            blogs: Number(blogCount.count),
            services: Number(serviceCount.count),
            references: Number(referenceCount.count),
            tours: Number(tourCount.count),
            heroSlides: Number(heroCount.count),
            testimonials: Number(testimonialCount.count),
        },
        recentMsgs,
        recentBlogs
    };
}

export default async function AdminDashboard() {
    const { counts, recentMsgs, recentBlogs } = await getDashboardStats();

    const cards = [
        {
            title: 'Araç Filosu',
            value: counts.vehicles,
            icon: Bus,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            link: '/admin/vehicles'
        },
        {
            title: 'Blog Yazıları',
            value: counts.blogs,
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            link: '/admin/blog'
        },
        {
            title: 'Hizmetler',
            value: counts.services,
            icon: Briefcase,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
            link: '/admin/services'
        },
        {
            title: 'Referanslar',
            value: counts.references,
            icon: MessageSquare,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            link: '/admin/references'
        },
        {
            title: 'Tur Paketleri',
            value: counts.tours,
            icon: Map,
            color: 'from-pink-500 to-pink-600',
            bgColor: 'bg-pink-50',
            iconColor: 'text-pink-600',
            link: '/admin/tours'
        },
        {
            title: 'Hero Slider',
            value: counts.heroSlides,
            icon: Image,
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            link: '/admin/hero'
        },
        {
            title: 'Müşteri Yorumları',
            value: counts.testimonials,
            icon: Star,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
            link: '/admin/testimonials'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Header & Welcome Area */}
            <div className="bg-white shadow-sm border-b border-gray-200 mb-8 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                            <Activity className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Panel Özeti</h1>
                            <p className="text-gray-500 text-sm mt-1">Sistem durumuna genel bakış</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex-1 md:max-w-xl">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-2.5 rounded-full hidden sm:block">
                                <span className="text-2xl">👋</span>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-blue-900">Hoş Geldiniz!</h2>
                                <p className="text-blue-700 text-sm mt-1">
                                    Admin panelinden tüm site içeriğini yönetebilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <a
                                key={index}
                                href={card.link}
                                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-28"
                            >
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`}></div>

                                <div className="p-4 flex flex-col h-full justify-between relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2 ${card.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={card.iconColor} size={20} />
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-2xl font-bold text-gray-900 leading-none">
                                                {card.value}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide truncate mt-auto">
                                        {card.title}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm">
                            <TrendingUp className="text-white" size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Hızlı İşlemler</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <a href="/admin/blog" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group">
                            <FileText className="text-purple-600 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700">Yeni Blog</span>
                        </a>
                        <a href="/admin/vehicles" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                            <Bus className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Araç Ekle</span>
                        </a>
                        <a href="/admin/services" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group">
                            <Briefcase className="text-green-600 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">Hizmet Ekle</span>
                        </a>
                        <a href="/admin/settings" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                            <Settings className="text-gray-600 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Ayarlar</span>
                        </a>
                        <a href="/admin/testimonials/new" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50 transition-all group">
                            <Star className="text-yellow-600 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-yellow-700">Yorum Ekle</span>
                        </a>
                    </div>
                </div>

                {/* Recent Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    {/* Recent Blogs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                    <FileText size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Son Blog Yazıları</h2>
                            </div>
                            <a href="/admin/blog" className="text-sm text-purple-600 hover:text-purple-700 font-semibold hover:underline">Tümünü Gör</a>
                        </div>
                        <div className="space-y-3">
                            {recentBlogs.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">Henüz blog yazısı eklenmemiş.</p>
                            ) : (
                                recentBlogs.map((blog) => (
                                    <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            {blog.imageUrl && (
                                                <img src={blog.imageUrl} alt={blog.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                                            )}
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{blog.title}</h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('tr-TR') : '-'}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {blog.isPublished ? 'Yayında' : 'Taslak'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href={`/admin/blog/${blog.id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Settings size={18} />
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <MessageSquare size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Son Mesajlar</h2>
                            </div>
                            <a href="/admin/contact-messages" className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline">Tümünü Gör</a>
                        </div>
                        <div className="space-y-3">
                            {recentMsgs.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">Henüz mesaj yok.</p>
                            ) : (
                                recentMsgs.map((msg) => (
                                    <div key={msg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <span className="font-bold text-sm">
                                                    {msg.name.substring(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{msg.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-gray-600 truncate max-w-[200px]">{msg.subject || 'Konu yok'}</p>
                                                    {msg.isRead ? (
                                                        <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                            <CheckCircle size={10} /> Okundu
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Yeni
                                                        </span>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('tr-TR') : '-'}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
