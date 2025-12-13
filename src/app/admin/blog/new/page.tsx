'use client';

import React from 'react';
import BlogForm from '../BlogForm';
import { createBlogPost } from '../actions';

export default function NewBlogPostPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Yazı Ekle</h1>
            <BlogForm action={createBlogPost} />
        </div>
    );
}
