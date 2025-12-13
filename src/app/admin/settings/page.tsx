'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { updateSettings, getSettings } from './actions';
import { AlertCircle, CheckCircle2, Save } from 'lucide-react';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';

export default function SettingsPage() {
    const [state, formAction, isPending] = useActionState(updateSettings, { success: false, message: '' });
    const [initialData, setInitialData] = useState<any>(null);

    // State for Rich Editors
    const [aboutText, setAboutText] = useState('');
    const [missionText, setMissionText] = useState('');
    const [visionText, setVisionText] = useState('');

    useEffect(() => {
        async function loadData() {
            const data = await getSettings();
            if (data) {
                setInitialData(data);
                setAboutText(data.aboutText || '');
                setMissionText(data.missionText || '');
                setVisionText(data.visionText || '');
            }
        }
        loadData();
    }, []);

    if (!initialData) {
        return <div className="p-8">Yükleniyor...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Genel Ayarlar</h1>
            </div>

            {state.message && (
                <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {state.message}
                </div>
            )}

            <form action={formAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">

                {/* Site Identity */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Site Kimliği</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Başlığı</label>
                            <input
                                type="text"
                                name="siteTitle"
                                defaultValue={initialData.siteTitle}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Açıklaması (Description)</label>
                            <input
                                type="text"
                                name="siteDescription"
                                defaultValue={initialData.siteDescription}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageUpload
                                name="logoFile"
                                defaultValue={initialData.logoUrl}
                                label="Site Logosu"
                                sizeHint="Önerilen: 200x60px .PNG (Şeffaf Arka Plan)"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                            <input
                                type="text"
                                name="address"
                                defaultValue={initialData.address}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon 1</label>
                            <input
                                type="text"
                                name="phone1"
                                defaultValue={initialData.phone1}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon 2</label>
                            <input
                                type="text"
                                name="phone2"
                                defaultValue={initialData.phone2}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={initialData.email}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                WhatsApp Numarası
                                <span className="text-xs text-gray-500 ml-2">(Ülke kodu ile birlikte, + işareti olmadan)</span>
                            </label>
                            <input
                                type="text"
                                name="whatsappNumber"
                                defaultValue={initialData.whatsappNumber}
                                placeholder="Örn: 905551234567"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                💡 Türkiye için: 90 + telefon numarası (örn: 905551234567)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Video Settings */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Video Ayarları</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                            <input
                                type="url"
                                name="videoUrl"
                                defaultValue={initialData.videoUrl || ''}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                💡 YouTube video URL'si (örn: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Video Thumbnail URL</label>
                            <input
                                type="url"
                                name="videoThumbnailUrl"
                                defaultValue={initialData.videoThumbnailUrl || ''}
                                placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                💡 YouTube thumbnail URL'si (örn: https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Corporate Texts */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Kurumsal Metinler</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hakkımızda (Kısa)</label>
                        <input type="hidden" name="aboutText" value={aboutText} />
                        <RichEditor
                            value={aboutText}
                            onChange={setAboutText}
                            placeholder="Hakkımızda yazısı..."
                            height="200px"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Misyonumuz</label>
                        <input type="hidden" name="missionText" value={missionText} />
                        <RichEditor
                            value={missionText}
                            onChange={setMissionText}
                            placeholder="Misyonumuz..."
                            height="150px"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vizyonumuz</label>
                        <input type="hidden" name="visionText" value={visionText} />
                        <RichEditor
                            value={visionText}
                            onChange={setVisionText}
                            placeholder="Vizyonumuz..."
                            height="150px"
                        />
                    </div>
                </div>

                {/* Social Media Settings */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Sosyal Medya Hesapları</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                            <input
                                type="url"
                                name="instagramUrl"
                                defaultValue={initialData.instagramUrl}
                                placeholder="https://instagram.com/hesapadiniz"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <input
                                type="url"
                                name="facebookUrl"
                                defaultValue={initialData.facebookUrl}
                                placeholder="https://facebook.com/hesapadiniz"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedinUrl"
                                defaultValue={initialData.linkedinUrl}
                                placeholder="https://linkedin.com/company/hesapadiniz"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        {isPending ? 'Kaydediliyor...' : <><Save size={20} /> Kaydet</>}
                    </button>
                </div>

            </form>
        </div>
    );
}
