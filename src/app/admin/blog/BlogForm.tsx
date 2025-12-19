import React, { useActionState, useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';

// Simple types for props
interface BlogFormProps {
    initialData?: any;
    action: any; // Server Action
}

export default function BlogForm({ initialData, action }: BlogFormProps) {
    // We bind the ID if updating, otherwise null
    const updateActionWithId = initialData ? action.bind(null, initialData.id) : action;
    const [state, formAction, isPending] = useActionState(updateActionWithId, { success: false, message: '' });

    // State for Rich Editor
    const [content, setContent] = useState(initialData?.content || '');

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            {state.message && (
                <div className={`p-4 rounded-lg ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL (Slug)</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={initialData?.slug}
                        required
                        placeholder="ornek-yazi-basligi"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <input type="hidden" name="existingImageUrl" value={initialData?.imageUrl || ''} />
                    <ImageUpload
                        name="image"
                        defaultValue={initialData?.imageUrl}
                        label="Kapak Görseli"
                        sizeHint="Önerilen: 800x500px .JPG, .PNG"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama (Özet)</label>
                    <textarea
                        name="excerpt"
                        defaultValue={initialData?.excerpt}
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                    <input type="hidden" name="content" value={content} />
                    <RichEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Blog yazınızı buraya yazın..."
                        height="400px"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                        defaultChecked={initialData?.isPublished ?? true} // Default true
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isPublished" className="text-gray-700 font-medium select-none">Yayında</label>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
                <Link href="/admin/blog" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
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
