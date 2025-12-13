'use client';

import React, { useEffect, useState } from 'react';
import TourForm from '../TourForm';
import { updateTour, getTour } from '../actions';
import { useParams } from 'next/navigation';

export default function EditTourPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const tour = await getTour(id);
                setData(tour);
            }
            setLoading(false);
        }
        fetch();
    }, [id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!data) return <div className="p-8">Tur paketi bulunamadı.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Tur Paketini Düzenle</h1>
            <TourForm initialData={data} action={updateTour} />
        </div>
    );
}
