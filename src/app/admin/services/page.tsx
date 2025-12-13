'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getServices, deleteService } from './actions';

export default function AdminServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setIsLoading(true);
        const data = await getServices();
        setServices(data);
        setIsLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

        const res = await deleteService(id);
        if (res.success) {
            loadData();
        } else {
            alert('Silme işlemi başarısız.');
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Hizmetler</h1>
                <Link
                    href="/admin/services/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={20} /> Yeni Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 w-16">Sıra</th>
                            <th className="p-4 font-semibold text-gray-600">Başlık</th>
                            <th className="p-4 font-semibold text-gray-600">Slug</th>
                            <th className="p-4 font-semibold text-gray-600">Durum</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Yükleniyor...</td></tr>
                        ) : services.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Henüz hizmet eklenmemiş.</td></tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-500">{service.order}</td>
                                    <td className="p-4 font-medium text-gray-900">{service.title}</td>
                                    <td className="p-4 text-gray-500 text-sm mono">{service.slug}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {service.isActive ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <Link href={`/hizmetlerimiz/${service.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 transition" title="Görüntüle">
                                            <Eye size={18} />
                                        </Link>
                                        <Link href={`/admin/services/${service.id}`} className="p-2 text-gray-400 hover:text-green-600 transition" title="Düzenle">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Sil">
                                            <Trash2 size={18} />
                                        </button>
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
