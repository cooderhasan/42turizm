'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactClientProps {
    settings?: any;
}

export default function ContactClient({ settings }: ContactClientProps) {
    const [contactInfo, setContactInfo] = useState({
        phone1: settings?.phone1 || '+90 555 555 55 55',
        phone2: settings?.phone2 || '+90 212 222 22 22',
        email: settings?.email || 'info@42turizm.com',
        address: settings?.address || 'Örnek Mahallesi, Turizm Caddesi No: 42<br />Kadıköy / İstanbul',
        googleMapsEmbedUrl: settings?.googleMapsEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650490010629!2d29.02330777648564!3d40.99049997135111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab86104d49651%3A0xe62c866d9f041d8e!2sKad%C4%B1k%C3%B6y%20R%C4%B1ht%C4%B1m!5e0!3m2!1str!2str!4v1709650000000!5m2!1str!2str'
    });

    useEffect(() => {
        if (settings) {
            setContactInfo({
                phone1: settings.phone1 || '+90 555 555 55 55',
                phone2: settings.phone2 || '+90 212 222 22 22',
                email: settings.email || 'info@42turizm.com',
                address: settings.address || 'Örnek Mahallesi, Turizm Caddesi No: 42<br />Kadıköy / İstanbul',
                googleMapsEmbedUrl: settings.googleMapsEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650490010629!2d29.02330777648564!3d40.99049997135111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab86104d49651%3A0xe62c866d9f041d8e!2sKad%C4%B1k%C3%B6y%20R%C4%B1ht%C4%B1m!5e0!3m2!1str!2str!4v1709650000000!5m2!1str!2str'
            });
        }
    }, [settings]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        try {
            console.log('Form submission started');
            console.log('Form data:', Object.fromEntries(formData.entries()));

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response data:', result);

            if (response.ok && result.success) {
                setSubmitStatus({ success: true, message: result.message || 'Mesajınız başarıyla gönderildi!' });
                formElement.reset();
            } else {
                setSubmitStatus({ success: false, message: result.message || 'Mesaj gönderilirken bir hata oluştu.' });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({ success: false, message: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="bg-[#0a192f] text-white pt-48 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Sorularınız, talepleriniz ve rezervasyonlarınız için bize ulaşın.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Contact Info */}
                    <div className="bg-white p-10 rounded-2xl shadow-lg h-full border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#0f172a] mb-8">İletişim Bilgileri</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0f172a] mb-1">Adres</h3>
                                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: contactInfo.address }}></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0f172a] mb-1">Telefon</h3>
                                    <p className="text-gray-600 mb-1">
                                        <a href={`tel:${contactInfo.phone1}`} className="hover:text-[#d4af37] transition-colors">{contactInfo.phone1}</a>
                                    </p>
                                    <p className="text-gray-600">
                                        <a href={`tel:${contactInfo.phone2}`} className="hover:text-[#d4af37] transition-colors">{contactInfo.phone2}</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0f172a] mb-1">E-posta</h3>
                                    <p className="text-gray-600">
                                        <a href={`mailto:${contactInfo.email}`} className="hover:text-[#d4af37] transition-colors">{contactInfo.email}</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0f172a] mb-1">Çalışma Saatleri</h3>
                                    <p className="text-gray-600">
                                        Pazartesi - Cumartesi: 09:00 - 18:00<br />
                                        Pazar: Kapalı
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-2xl shadow-lg h-full border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Bize Yazın</h2>

                        {/* Status Message */}
                        {submitStatus && (
                            <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all placeholder-gray-500 text-gray-900"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all placeholder-gray-500 text-gray-900"
                                        placeholder="ornek@domain.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all placeholder-gray-500 text-gray-900"
                                    placeholder="0555 555 55 55"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-500"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="teklif" className="text-gray-900">Fiyat Teklifi Almak İstiyorum</option>
                                    <option value="bilgi" className="text-gray-900">Hizmetler Hakkında Bilgi</option>
                                    <option value="is_basvurusu" className="text-gray-900">İş Başvurusu</option>
                                    <option value="diger" className="text-gray-900">Diğer</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all placeholder-gray-500 text-gray-900"
                                    placeholder="Mesajınızı buraya yazınız..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl ${isSubmitting ? 'bg-[#d4af37]/70 cursor-not-allowed' : 'bg-[#d4af37] text-white hover:bg-[#b5952f]'}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Gönderiliyor...
                                    </span>
                                ) : (
                                    'Mesajı Gönder'
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] bg-gray-200">
                <iframe
                    src={contactInfo.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>
    );
}
