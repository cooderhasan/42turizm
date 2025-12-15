import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Play, FileText, User } from 'lucide-react';
import { db } from '@/db';
import { blogPosts, settings } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export default async function BlogAndVideo() {
    let posts: any[] = [];
    let settingsData: any = null;

    try {
        // Get settings for video URL
        const settingsResult = await db.select().from(settings).limit(1);
        if (settingsResult.length > 0) {
            settingsData = settingsResult[0];
        }

        posts = await db.query.blogPosts.findMany({
            where: eq(blogPosts.isPublished, true),
            orderBy: [desc(blogPosts.publishedAt)],
            limit: 2,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return empty array if query fails
        posts = [];
    }

    // Extract YouTube video ID from URL for thumbnail
    const getYouTubeVideoId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Convert YouTube URL to watch URL (direct video page)
    const getYouTubeWatchUrl = (url: string) => {
        if (!url) return null;
        const videoId = getYouTubeVideoId(url);
        if (!videoId) return null;
        return `https://www.youtube.com/watch?v=${videoId}`;
    };

    const videoUrl = settingsData?.videoUrl || '';
    const videoThumbnailUrl = settingsData?.videoThumbnailUrl || (videoUrl ? `https://img.youtube.com/vi/${getYouTubeVideoId(videoUrl)}/maxresdefault.jpg` : '');
    const videoWatchUrl = getYouTubeWatchUrl(videoUrl);

    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Şirket Etkinlikleri ve Duyurular</h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                    {/* Left: Video Section */}
                    <div className="relative group rounded-2xl overflow-hidden shadow-2xl h-full min-h-[300px] lg:min-h-0 bg-black/90 cursor-pointer">
                        {/* Thumbnail - Use custom thumbnail if available, otherwise YouTube thumbnail */}
                        <div className="absolute inset-0 opacity-60">
                            <Image
                                src={videoThumbnailUrl || "https://images.unsplash.com/photo-1549144511-6c9ab48a584a?q=80&w=2070&auto=format&fit=crop"}
                                alt="Tanıtım Videosu"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Play Button Overlay - Now opens YouTube directly */}
                        {videoWatchUrl && (
                            <Link
                                href={videoWatchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center z-10"
                            >
                                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all duration-300 group-hover:animate-pulse">
                                    <Play size={32} fill="currentColor" className="ml-1" />
                                </div>
                            </Link>
                        )}

                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white text-xl font-bold">42 Turizm Tanıtım Filmi</h3>
                            <p className="text-gray-300 text-sm">Hizmet kalitemizi ve filomuzu yakından tanıyın.</p>
                        </div>
                    </div>

                    {/* Right: Latest Blog Posts */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-2">Güncel Yazılar</h2>
                                <h3 className="text-3xl font-bold text-[#0f172a]">Blogumuzdan</h3>
                            </div>
                            <div className="hidden md:block h-1 w-20 bg-[#d4af37] rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post) => (
                                <div key={post.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d4af37]/30">
                                    <div className="relative h-48 overflow-hidden">
                                        {post.imageUrl ? (
                                            <Image
                                                src={post.imageUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                <FileText size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-[#d4af37] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            Haberler
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishedAt || '').toLocaleDateString('tr-TR')}</span>
                                            <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-[#0f172a] group-hover:text-[#d4af37] transition-colors mb-3 line-clamp-2 leading-tight">{post.title}</h4>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[#d4af37] font-bold text-sm uppercase tracking-wide hover:underline">
                                            Devamını Oku <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center w-full py-4 border-2 border-[#0f172a] text-[#0f172a] rounded-xl font-bold uppercase tracking-wider hover:bg-[#0f172a] hover:text-white transition-all duration-300"
                            >
                                Tüm Yazıları İncele <ArrowRight className="ml-2" size={20} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
