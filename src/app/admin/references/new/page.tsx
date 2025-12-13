import React from 'react';
import ReferenceForm from '../ReferenceForm';
import { createReference } from '../actions';

export default function NewReferencePage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Referans Ekle</h1>
            <ReferenceForm action={createReference} />
        </div>
    );
}
