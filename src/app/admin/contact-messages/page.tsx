'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, CheckCircle2, AlertCircle, Trash2, Eye, EyeOff } from 'lucide-react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact-messages');
            const data = await response.json();

            if (data.success) {
                setMessages(data.messages);
            } else {
                setError(data.message || 'Mesajlar yüklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Mesajlar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/contact-messages/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (data.success) {
                fetchMessages();
            } else {
                alert(data.message || 'Mesaj silinirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Mesaj silinirken bir hata oluştu.');
        }
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            const response = await fetch(`/api/contact-messages/${id}/read`, {
                method: 'PATCH'
            });
            const data = await response.json();

            if (data.success) {
                fetchMessages();
            } else {
                alert(data.message || 'Mesaj işaretlenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error marking message as read:', error);
            alert('Mesaj işaretlenirken bir hata oluştu.');
        }
    };

    const openModal = (message: ContactMessage) => {
        setSelectedMessage(message);
        setIsModalOpen(true);

        // Mark as read when opened
        if (!message.isRead) {
            handleMarkAsRead(message.id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex">
                        <AlertCircle className="text-red-500 mr-3 mt-1" size={20} />
                        <div>
                            <p className="text-red-700 font-medium">{error}</p>
                            <button
                                onClick={fetchMessages}
                                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Yeniden Dene
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gelen Mesajlar</h1>
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                    <Mail size={16} className="text-blue-600" />
                    <span className="font-semibold text-blue-800">{messages.length} Mesaj</span>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <Mail className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Henüz mesaj yok</h3>
                    <p className="text-gray-600">Gelen mesajlar burada görünecek.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Gönderen</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Konu</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tarih</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {messages.map((message) => (
                                    <tr key={message.id} className={message.isRead ? 'bg-white' : 'bg-blue-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{message.name}</div>
                                            <div className="text-sm text-gray-500">{message.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-700">{message.subject || 'Konu belirtilmemiş'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(message.createdAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${message.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {message.isRead ? (
                                                    <>
                                                        <CheckCircle2 size={12} className="mr-1" /> Okundu
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle size={12} className="mr-1" /> Yeni
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(message)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Görüntüle"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(message.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Message Detail Modal */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Mesaj Detayı</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="sr-only">Kapat</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Gönderen Bilgileri</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                                                <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                                            </div>
                                        </div>

                                        {selectedMessage.phone && (
                                            <div className="flex items-center gap-3">
                                                <div className="bg-green-100 p-2 rounded-lg">
                                                    <Phone size={20} className="text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Telefon</p>
                                                    <p className="text-sm text-gray-600">{selectedMessage.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Mesaj Bilgileri</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                <Clock size={20} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Tarih</p>
                                                <p className="text-sm text-gray-600">{formatDate(selectedMessage.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="bg-yellow-100 p-2 rounded-lg">
                                                <Mail size={20} className="text-yellow-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Konu</p>
                                                <p className="text-sm text-gray-600">{selectedMessage.subject || 'Konu belirtilmemiş'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Mesaj İçeriği</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}