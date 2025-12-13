import Link from 'next/link';
import { Plus, Edit, Bus } from 'lucide-react';
import { getVehicles, deleteVehicle } from './actions';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function VehiclesPage() {
    const vehiclesData = await getVehicles();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Araç Filosu</h1>
                    <p className="text-gray-500 mt-1">Filodaki araçları yönetin.</p>
                </div>
                <Link
                    href="/admin/vehicles/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} /> Yeni Araç Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Görsel</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Araç Adı</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kapasite</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Durum</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vehiclesData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Henüz araç eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            vehiclesData.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 relative rounded-md overflow-hidden bg-gray-100">
                                            {vehicle.imageUrl ? (
                                                <Image src={vehicle.imageUrl} alt={vehicle.name} fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <Bus size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{vehicle.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                            {vehicle.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{vehicle.capacity} Kişilik</td>
                                    <td className="px-6 py-4">
                                        {vehicle.isActive ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/vehicles/${vehicle.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteButton action={deleteVehicle.bind(null, vehicle.id)} />
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
