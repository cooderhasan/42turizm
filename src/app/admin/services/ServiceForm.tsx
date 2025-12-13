import React, { useActionState, useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';

interface ServiceFormProps {
    initialData?: any;
    action: any;
}

export default function ServiceForm({ initialData, action }: ServiceFormProps) {
    const updateActionWithId = initialData ? action.bind(null, initialData.id) : action;
    const [state, formAction, isPending] = useActionState(updateActionWithId, { success: false, message: '' });

    // State for Rich Editor
    const [detailedDescription, setDetailedDescription] = useState(initialData?.detailedDescription || '');

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            {state.message && (
                <div className={`p-4 rounded-lg ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL (Slug)</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={initialData?.slug}
                        required
                        placeholder="orn-hizmet-adi"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <ImageUpload
                        name="image"
                        defaultValue={initialData?.imageUrl}
                        label="Hizmet Görseli"
                        sizeHint="Önerilen: 600x400px .JPG, .PNG"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İkon Adı (Lucide)</label>
                    <input
                        type="text"
                        name="iconName"
                        defaultValue={initialData?.iconName}
                        placeholder="Bus, User, Map..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
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

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
                    <textarea
                        name="shortDescription"
                        defaultValue={initialData?.shortDescription}
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama</label>
                    <input type="hidden" name="detailedDescription" value={detailedDescription} />
                    <RichEditor
                        value={detailedDescription}
                        onChange={setDetailedDescription}
                        placeholder="Hizmet detaylarını buraya yazın..."
                        height="300px"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hizmet Bölgesi</label>
                    <input
                        type="text"
                        name="serviceArea"
                        defaultValue={initialData?.serviceArea || 'Konya genelinde ve talep üzerine tüm Türkiye\'de hizmet vermekteyiz.'}
                        placeholder="Konya genelinde ve talep üzerine tüm Türkiye'de hizmet vermekteyiz."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Özellikler (Her satıra bir özellik)</label>
                    <textarea
                        name="features"
                        defaultValue={initialData?.features?.join('\n')}
                        rows={5}
                        placeholder="Dakik Hizmet&#10;GPRS Takip..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    ></textarea>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
                <Link href="/admin/services" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
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
