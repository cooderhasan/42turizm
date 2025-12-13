
import React from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { getHeroSlides } from './actions';
import DeleteButton from '@/components/admin/DeleteButton';
import { deleteHeroSlide } from './actions';

export const metadata = {
    title: 'Hero Slider Yönetimi | Admin Paneli',
};

export default async function HeroPage() {
    const slides = await getHeroSlides();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Hero Slider</h1>
                <Link
                    href="/admin/hero/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} /> Yeni Slayt Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Görsel</th>
                                <th className="px-6 py-3 font-semibold">Başlık</th>
                                <th className="px-6 py-3 font-semibold">Sıra</th>
                                <th className="px-6 py-3 font-semibold">Durum</th>
                                <th className="px-6 py-3 font-semibold text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {slides.map((slide) => (
                                <tr key={slide.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="relative w-24 h-14 rounded overflow-hidden bg-gray-100">
                                            {slide.imageUrl && (
                                                <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{slide.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{slide.order}</td>
                                    <td className="px-6 py-4">
                                        {slide.isActive ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Eye size={12} /> Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <EyeOff size={12} /> Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/hero/${slide.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <DeleteButton action={deleteHeroSlide.bind(null, slide.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {slides.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Henüz hiç slayt eklenmemiş.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
