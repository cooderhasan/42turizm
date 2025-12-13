import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Play } from 'lucide-react';
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
            limit: 3,
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Video Section */}
                    <div className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black/90 cursor-pointer">
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
                    <div className="flex flex-col gap-6">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex gap-4 group">
                                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                        src={post.imageUrl || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80'}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{post.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar size={14} />
                                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : 'Yayınlanmadı'}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                                </div>
                            </Link>
                        ))}

                        <div className="pt-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center w-full py-3 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                            >
                                Tüm Duyuruları Gör <ArrowRight className="ml-2" size={20} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
