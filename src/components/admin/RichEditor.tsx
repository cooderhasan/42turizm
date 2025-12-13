'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import to avoid SSR issues with Quill
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

export default function RichEditor({ value, onChange, placeholder, height = '300px' }: RichEditorProps) {

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                style={{ height: height, marginBottom: '50px' }} // Margin for toolbar
                className="bg-white text-gray-900"
            />
            {/* Styles to ensure text is visible in dark mode if needed, though we force bg-white */}
            <style jsx global>{`
                .ql-editor {
                    min-height: ${height};
                    font-size: 1rem;
                    color: #111827; /* gray-900 */
                }
                .ql-toolbar {
                    background-color: #f9fafb; /* gray-50 */
                    border-radius: 0.5rem 0.5rem 0 0;
                }
                .ql-container {
                    border-radius: 0 0 0.5rem 0.5rem;
                    font-family: inherit;
                }
                .ql-editor.ql-blank::before {
                    color: #6b7280; /* gray-500 placeholder */
                    font-style: normal;
                }
            `}</style>
        </div>
    );
}
