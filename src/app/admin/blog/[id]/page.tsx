'use client';

import React, { useEffect, useState } from 'react';
import BlogForm from '../BlogForm';
import { updateBlogPost, getBlogPost } from '../actions';
import { useParams } from 'next/navigation';

export default function EditBlogPostPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const post = await getBlogPost(id);
                setData(post);
            }
            setLoading(false);
        }
        fetch();
    }, [id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!data) return <div className="p-8">Yazı bulunamadı.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yazıyı Düzenle</h1>
            <BlogForm initialData={data} action={updateBlogPost} />
        </div>
    );
}
