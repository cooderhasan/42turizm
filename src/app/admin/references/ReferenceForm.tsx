'use client';

import React, { useActionState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ReferenceFormProps {
    initialData?: any;
    action: any;
}

export default function ReferenceForm({ initialData, action }: ReferenceFormProps) {
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firma / Kurum Adı</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        placeholder="Örn: Milli Eğitim Bakanlığı"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Dosyası</label>
                    <input
                        type="file"
                        name="logoFile"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                        required={!initialData}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <div className="mt-2 space-y-1">
                        {initialData?.imageUrl && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                                <p className="text-xs text-amber-800 font-medium mb-1">
                                    🔄 Mevcut Logo: {initialData.imageUrl}
                                </p>
                                <p className="text-xs text-amber-700">
                                    <strong>Logo değiştirmek için:</strong> Yukarıdaki "Dosya Seç" butonuna tıklayıp yeni bir logo seçin.
                                </p>
                                <p className="text-xs text-amber-600 mt-1">
                                    <strong>Logo değiştirmemek için:</strong> Dosya seçmeden direkt "Kaydet" butonuna basın, mevcut logo korunacaktır.
                                </p>
                            </div>
                        )}
                        <p className="text-xs text-blue-600 font-medium">
                            💡 Önerilen boyut: 300x150 piksel (genişlik x yükseklik)
                        </p>
                        <p className="text-xs text-gray-500">
                            ✓ Desteklenen formatlar: PNG, JPG, SVG, WebP
                        </p>
                        <p className="text-xs text-gray-500">
                            ✓ Şeffaf arka plan için PNG veya SVG kullanın
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                        name="category"
                        defaultValue={initialData?.category || 'private'}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
                    >
                        <option value="private">Özel Sektör</option>
                        <option value="public">Kamu Kurumu</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama (Order)</label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={initialData?.order || 0}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
                <Link href="/admin/references" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
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
