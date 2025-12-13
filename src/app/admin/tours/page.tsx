import Link from 'next/link';
import { Plus, Edit, Map, Image as ImageIcon } from 'lucide-react';
import { getTours, deleteTour } from './actions';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function ToursPage() {
    const toursData = await getTours();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Tur Paketleri</h1>
                    <p className="text-gray-500 mt-1">Kültür Turları altındaki paketleri yönetin.</p>
                </div>
                <Link
                    href="/admin/tours/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} /> Yeni Tur Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kapak</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Başlık</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Slug</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {toursData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Henüz tur paketi eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            toursData.map((tour) => (
                                <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 relative rounded-md overflow-hidden bg-gray-100">
                                            {tour.coverImage ? (
                                                <Image src={tour.coverImage} alt={tour.title} fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <Map size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{tour.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{tour.slug}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Gallery Management Link */}
                                            <Link
                                                href={`/admin/tours/${tour.id}/images`}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Galeri Yönetimi"
                                            >
                                                <ImageIcon size={18} />
                                            </Link>

                                            <Link
                                                href={`/admin/tours/${tour.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteButton action={deleteTour.bind(null, tour.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
