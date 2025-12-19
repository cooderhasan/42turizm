'use client';

import React, { useActionState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface TestimonialFormProps {
    initialData?: any;
    action: any;
}

export default function TestimonialForm({ initialData, action }: TestimonialFormProps) {
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adı Soyadı</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unvanı</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        placeholder="Örn: Genel Müdür, XYZ Şirketi"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yorum İçeriği</label>
                    <textarea
                        name="content"
                        defaultValue={initialData?.content}
                        required
                        rows={4}
                        placeholder="Müşterinin deneyimini anlatan detaylı yorum..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Puan (1-5)</label>
                    <select
                        name="rating"
                        defaultValue={initialData?.rating || 5}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-500"
                    >
                        <option value="5">5 - Mükemmel</option>
                        <option value="4">4 - Çok İyi</option>
                        <option value="3">3 - İyi</option>
                        <option value="2">2 - Orta</option>
                        <option value="1">1 - Zayıf</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama</label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={initialData?.order || 0}
                        placeholder="0"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Müşteri Görseli</label>
                    <p className="text-xs text-gray-500 mb-2">Önerilen: 200x200px, PNG/JPG (Max 5MB)</p>
                    <input type="hidden" name="existingImageUrl" value={initialData?.imageUrl || ''} />
                    <ImageUpload
                        name="imageFile"
                        defaultValue={initialData?.imageUrl}
                        label="Müşteri Görseli"
                        sizeHint="Önerilen: 200x200px, PNG/JPG (Max 5MB)"
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
                <Link href="/admin/testimonials" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
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