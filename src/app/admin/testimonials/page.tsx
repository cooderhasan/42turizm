'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Star, MessageCircle } from 'lucide-react';
import { getTestimonials, deleteTestimonial } from './actions';
import { useRouter } from 'next/navigation';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        async function fetchTestimonials() {
            try {
                const data = await getTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
            try {
                await deleteTestimonial(id);
                setTestimonials(testimonials.filter(t => t.id !== id));
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Yorum silinirken bir hata oluştu.');
            }
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Müşteri Yorumları</h1>
                    <Link href="/admin/testimonials/new" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Plus size={20} /> Yeni Yorum Ekle
                    </Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-600">Yorumlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Müşteri Yorumları</h1>
                <Link href="/admin/testimonials/new" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus size={20} /> Yeni Yorum Ekle
                </Link>
            </div>

            {testimonials.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <MessageCircle size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Henüz yorum bulunmamaktadır</h3>
                    <p className="text-gray-600">Yukarıdaki butonu kullanarak ilk yorumunuzu ekleyebilirsiniz.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Adı</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unvanı</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Yorum</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Puan</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {testimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{testimonial.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{testimonial.title || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{testimonial.content}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex items-center gap-1">
                                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                <span>{testimonial.rating}/5</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${testimonial.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {testimonial.isActive ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/testimonials/${testimonial.id}`} className="text-blue-600 hover:text-blue-800">
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleDelete(testimonial.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}