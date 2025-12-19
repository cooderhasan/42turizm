

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

// We need to match Next.js Page Props type for Params
// Since this is a server component, we access params directly or await it in newer Next.js versions
// For now, let's treat it as a standard async component

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post;
    try {
        post = await db.query.blogPosts.findFirst({
            where: eq(blogPosts.slug, slug),
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return { title: 'Yazı Bulunamadı' };
    }

    if (!post) {
        return {
            title: 'Yazı Bulunamadı',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: [post.imageUrl || ''],
        }
    };
}


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post;
    try {
        post = await db.query.blogPosts.findFirst({
            where: eq(blogPosts.slug, slug),
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
    }

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author || "42 Turizm"
        },
        "publisher": {
            "@type": "Organization",
            "name": "42 Turizm",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.42turizm.com/logo.png"
            }
        },
        "datePublished": post.publishedAt || post.createdAt,
        "dateModified": post.updatedAt || post.createdAt,
        "description": post.excerpt
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Article Header */}
            <div className="bg-[#0a192f] text-white pt-48 pb-32">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <span className="inline-block bg-[#d4af37] text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">{post.category || 'Duyuru'}</span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt || new Date()).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} /> {post.author || 'Admin'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Featured Image */}
                    <div className="relative h-[400px] w-full">
                        <Image
                            src={post.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <article className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#0f172a] prose-a:text-[#d4af37] prose-blockquote:border-[#d4af37]">
                            {/* Basic HTML rendering */}
                            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                        </article>

                        <hr className="my-10 border-gray-100" />

                        <div className="flex justify-between items-center">
                            <Link href="/blog" className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] font-bold transition-colors">
                                <ArrowLeft size={20} /> Blog Listesine Dön
                            </Link>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] transition-colors font-semibold">
                                <Share2 size={20} /> <span className="hidden sm:inline">Paylaş</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
