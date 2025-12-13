
import React from 'react';
import HeroForm from '../HeroForm';
import { createHeroSlide } from '../actions';

export const metadata = {
    title: 'Yeni Slayt Ekle | Admin Paneli',
};

export default function NewHeroPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Yeni Slayt Ekle</h1>
                <p className="text-gray-500 mt-1">Anasayfa slider alanına yeni bir görsel ekleyin.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <HeroForm action={createHeroSlide} />
            </div>
        </div>
    );
}
