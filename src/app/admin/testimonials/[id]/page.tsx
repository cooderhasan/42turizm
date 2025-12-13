'use client';

import React from 'react';
import TestimonialForm from '../TestimonialForm';
import { updateTestimonial, getTestimonial } from '../actions';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Testimonial {
    id: number;
    name: string;
    title: string | null;
    content: string;
    rating: number | null;
    imageUrl: string | null;
    isActive: boolean | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export default function EditTestimonialPage() {
    const params = useParams();
    const [testimonial, setTestimonial] = React.useState<Testimonial | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchTestimonial() {
            try {
                const id = Number(params.id);
                if (isNaN(id)) {
                    setError('Geçersiz yorum ID');
                    return;
                }

                const data = await getTestimonial(id);
                if (!data) {
                    setError('Yorum bulunamadı');
                    return;
                }

                setTestimonial(data);
            } catch (error) {
                console.error('Error fetching testimonial:', error);
                setError('Yorum yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonial();
    }, [params.id]);

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Yorumu Düzenle</h1>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-600">Yorum yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Yorumu Düzenle</h1>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="text-red-500 p-3 bg-red-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Hata</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Yorumu Düzenle</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <TestimonialForm initialData={testimonial} action={updateTestimonial} />
            </div>
        </div>
    );
}