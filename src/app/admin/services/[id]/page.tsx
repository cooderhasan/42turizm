'use client';

import React, { useEffect, useState } from 'react';
import ServiceForm from '../ServiceForm';
import { updateService, getService } from '../actions';
import { useParams } from 'next/navigation';

export default function EditServicePage() {
    const params = useParams();
    const id = Number(params?.id);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const service = await getService(id);
                setData(service);
            }
            setLoading(false);
        }
        fetch();
    }, [id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!data) return <div className="p-8">Hizmet bulunamadı.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Hizmeti Düzenle</h1>
            <ServiceForm initialData={data} action={updateService} />
        </div>
    );
}
