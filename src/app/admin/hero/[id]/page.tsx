
import React from 'react';
import { notFound } from 'next/navigation';
import HeroForm from '../HeroForm';
import { getHeroSlide, updateHeroSlide } from '../actions';

interface EditHeroPageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Slayt Düzenle | Admin Paneli',
};

export default async function EditHeroPage({ params }: EditHeroPageProps) {
    const { id } = await params;
    const slide = await getHeroSlide(Number(id));

    if (!slide) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Slayt Düzenle</h1>
                <p className="text-gray-500 mt-1">Slayt bilgilerini ve görselini güncelleyin.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <HeroForm initialData={slide} action={updateHeroSlide} />
            </div>
        </div>
    );
}
