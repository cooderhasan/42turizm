'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
    action: (formData: FormData) => void | Promise<void> | Promise<any>;
}

export default function DeleteButton({ action }: DeleteButtonProps) {
    return (
        <form action={action}>
            <button
                type="submit"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sil"
                onClick={(e) => {
                    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) {
                        e.preventDefault();
                    }
                }}
            >
                <Trash2 size={18} />
            </button>
        </form>
    );
}
