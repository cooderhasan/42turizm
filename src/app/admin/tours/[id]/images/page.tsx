'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { ArrowLeft, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { addTourImage, deleteTourImage, getTourImages } from '../../images-actions';
import { getTour } from '../../actions'; // Reusing getTour to show title
import Image from 'next/image';

// Form Component for Adding Image
function AddImageForm({ tourId }: { tourId: number }) {
    const [state, formAction, isPending] = useActionState(addTourImage, { success: false, message: '' });

    return (
        <form action={formAction} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Plus size={18} /> Yeni Görsel Ekle
            </h3>

            <input type="hidden" name="tourId" value={tourId} />

            <div className="flex gap-4 items-center">
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 h-[42px]"
                >
                    {isPending ? 'Yükleniyor...' : 'Yükle'}
                </button>
            </div>
            {state.message && (
                <p className={`mt-2 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                    {state.message}
                </p>
            )}
        </form>
    );
}

export default function TourImagesPage() {
    const params = useParams();
    const tourId = Number(params?.id);
    const [images, setImages] = useState<any[]>([]);
    const [tourTitle, setTourTitle] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        async function fetchData() {
            if (tourId) {
                const tourData = await getTour(tourId);
                const imagesData = await getTourImages(tourId);
                if (tourData) setTourTitle(tourData.title);
                setImages(imagesData);
            }
            setLoading(false);
        }
        fetchData();
    }, [tourId]);

    // Handle Delete (Client side wrapper for server action to update state optimistically or re-fetch)
    const handleDelete = async (imageId: number) => {
        if (!confirm('Bu görseli silmek istiyor musunuz?')) return;

        const result = await deleteTourImage(imageId, tourId);
        if (result.success) {
            setImages(prev => prev.filter(img => img.id !== imageId));
        } else {
            alert('Silinemedi.');
        }
    };

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/tours" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Galeri Yönetimi</h1>
                    <p className="text-gray-500">{tourTitle} için görseller</p>
                </div>
            </div>

            {/* Add Image Form */}
            <AddImageForm tourId={tourId} />

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.length === 0 ? (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
                        <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Henüz görsel eklenmemiş.</p>
                    </div>
                ) : (
                    images.map((img) => (
                        <div key={img.id} className="group relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                            <Image
                                src={img.imageUrl}
                                alt="Galeri Görseli"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors transform hover:scale-110"
                                    title="Sil"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
