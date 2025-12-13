'use client';

import React, { useEffect, useState } from 'react';
import VehicleForm from '../VehicleForm';
import { updateVehicle, getVehicle } from '../actions';
import { useParams } from 'next/navigation';

export default function EditVehiclePage() {
    const params = useParams();
    const id = Number(params?.id);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const vehicle = await getVehicle(id);
                setData(vehicle);
            }
            setLoading(false);
        }
        fetch();
    }, [id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!data) return <div className="p-8">Araç bulunamadı.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Aracı Düzenle</h1>
            <VehicleForm initialData={data} action={updateVehicle} />
        </div>
    );
}
