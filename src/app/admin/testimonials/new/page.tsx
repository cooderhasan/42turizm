import React from 'react';
import TestimonialForm from '../TestimonialForm';
import { createTestimonial } from '../actions';

export default function NewTestimonialPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Yeni Müşteri Yorumu Ekle</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <TestimonialForm action={createTestimonial} />
            </div>
        </div>
    );
}