'use client';

import React, { useActionState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface VehicleFormProps {
    initialData?: any;
    action: any;
}

export default function VehicleForm({ initialData, action }: VehicleFormProps) {
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Araç Adı</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        placeholder="Örn: Mercedes Vito VIP"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                        name="category"
                        defaultValue={initialData?.category || ''}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-500"
                    >
                        <option value="" disabled className="text-gray-400">Kategori Seçiniz</option>
                        <option value="Binek">Binek Araç</option>
                        <option value="VIP">VIP Minibüs</option>
                        <option value="Minibüs">Servis Minibüsü (16+1)</option>
                        <option value="Otobüs">Otobüs (45+1)</option>
                        <option value="Midibüs">Midibüs (27+1)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kapasite (Kişi)</label>
                    <input
                        type="number"
                        name="capacity"
                        defaultValue={initialData?.capacity}
                        placeholder="Örn: 9"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yakıt Tipi</label>
                    <input
                        type="text"
                        name="fuelType"
                        defaultValue={initialData?.fuelType}
                        placeholder="Örn: Dizel"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sürücü Seçeneği</label>
                    <select
                        name="driverOption"
                        defaultValue={initialData?.driverOption || ''}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-500"
                    >
                        <option value="" disabled className="text-gray-400">Sürücü Seçeneği Seçiniz</option>
                        <option value="Şoförlü">Şoförlü</option>
                        <option value="Şoförsüz">Şoförsüz (Kiralama)</option>
                        <option value="Her İkisi">Her İkisi de Mümkün</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Araç Görseli</label>
                    <p className="text-xs text-gray-500 mb-2">Önerilen: 800x600px, PNG/JPG (Max 5MB)</p>
                    <ImageUpload
                        name="imageFile"
                        defaultValue={initialData?.imageUrl}
                        label="Araç Görseli"
                        sizeHint="Önerilen: 800x600px, PNG/JPG (Max 5MB)"
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
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
                <Link href="/admin/vehicles" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
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
