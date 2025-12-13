'use client';

import React, { useEffect, useState } from 'react';
import ReferenceForm from '../ReferenceForm';
import { updateReference, getReference } from '../actions';
import { useParams } from 'next/navigation';

export default function EditReferencePage() {
    const params = useParams();
    const id = Number(params?.id);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const ref = await getReference(id);
                setData(ref);
            }
            setLoading(false);
        }
        fetch();
    }, [id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!data) return <div className="p-8">Referans bulunamadı.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Referansı Düzenle</h1>
            <ReferenceForm initialData={data} action={updateReference} />
        </div>
    );
}
