
'use client';

import React, { useActionState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface HeroFormProps {
    initialData?: any;
    action: any;
}

export default function HeroForm({ initialData, action }: HeroFormProps) {
    const updateActionWithId = initialData ? action.bind(null, initialData.id) : action;
    const [state, formAction, isPending] = useActionState(updateActionWithId, { success: false, message: '' });

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            {state.message && (
                <div className={`p-4 rounded-lg ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <input type="hidden" name="existingImageUrl" value={initialData?.imageUrl || ''} />
                    <ImageUpload
                        name="image"
                        defaultValue={initialData?.imageUrl}
                        label="Arka Plan Görseli"
                        sizeHint="Önerilen: 1920x1080px (Yüksek Çözünürlük)"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                    <textarea
                        name="subtitle"
                        defaultValue={initialData?.subtitle}
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buton Metni</label>
                    <input
                        type="text"
                        name="buttonText"
                        defaultValue={initialData?.buttonText}
                        placeholder="Örn: Teklif Alın"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buton Linki</label>
                    <input
                        type="text"
                        name="buttonLink"
                        defaultValue={initialData?.buttonLink}
                        placeholder="/iletisim"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama</label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={initialData?.order || 0}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div className="flex items-end pb-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            defaultChecked={initialData?.isActive ?? true}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isActive" className="text-gray-700 font-medium select-none">Aktif</label>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
                <Link href="/admin/hero" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                    <ArrowLeft size={18} /> İptal
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    {isPending ? 'Kaydediliyor...' : <><Save size={20} /> Kaydet</>}
                </button>
            </div>
        </form>
    );
}
