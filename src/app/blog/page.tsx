
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const metadata = {
    title: 'Blog - 42 Turizm',
    description: '42 Turizm hizmetleri, sektörden haberler ve duyurular.',
};

export default async function BlogPage() {
    let posts: any[] = [];
    try {
        posts = await db.query.blogPosts.findMany({
            where: eq(blogPosts.isPublished, true),
            orderBy: [desc(blogPosts.createdAt)],
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        posts = [];
    }

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog ve Duyurular</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Turizm taşımacılığı sektöründen güncel haberler, şirketimizden duyurular ve gezi rehberleri.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={post.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Duyuru
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} className="text-blue-500" />
                                            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : 'Tarih Yok'}</span>
                                        </div>
                                        {post.author && (
                                            <div className="flex items-center gap-1">
                                                <User size={16} className="text-blue-500" />
                                                <span>{post.author}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                                        Devamını Oku <ArrowRight size={20} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Henüz içerik eklenmedi.</h3>
                        <p className="text-gray-600">Blog yazıları ve duyurular çok yakında burada olacak.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
