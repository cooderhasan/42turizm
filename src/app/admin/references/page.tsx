import Link from 'next/link';
import { Plus, Edit, Building2 } from 'lucide-react';
import { getReferences, deleteReference } from './actions';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function ReferencesPage() {
    const referencesData = await getReferences();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Referanslar</h1>
                    <p className="text-gray-500 mt-1">İş ortaklarımızı ve referanslarımızı yönetin.</p>
                </div>
                <Link
                    href="/admin/references/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} /> Yeni Referans Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Logo</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">İsim</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {referencesData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Henüz referans eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            referencesData.map((ref) => (
                                <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 relative rounded-md overflow-hidden bg-white border border-gray-200">
                                            {ref.imageUrl ? (
                                                <Image src={ref.imageUrl} alt={ref.name} fill className="object-contain p-1" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <Building2 size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{ref.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${ref.category === 'public'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {ref.category === 'public' ? 'Kamu Kurumu' : 'Özel Sektör'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/references/${ref.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteButton action={deleteReference.bind(null, ref.id)} />
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
