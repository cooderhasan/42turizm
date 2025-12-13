import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gizlilik Politikası</h1>
                        <p className="text-gray-600">Son güncelleme: 13 Aralık 2025</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Giriş</h2>
                        <p className="text-gray-700 mb-4">
                            42 Turizm ("Şirket", "biz", "bize" veya "bizim"), bu Gizlilik Politikası aracılığıyla, web sitemizi ziyaret ettiğinizde, hizmetlerimizi kullandığınızda veya bizimle etkileşimde bulunduğunuzda kişisel verilerinizi nasıl topladığımızı, kullandığımızı, paylaştığımızı ve koruduğumuzu açıklamaktadır.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Toplanan Bilgiler</h2>
                        <p className="text-gray-700 mb-4">Aşağıdaki kişisel bilgileri toplayabiliriz:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Adınız, e-posta adresiniz, telefon numaranız gibi iletişim bilgileri</li>
                            <li>IP adresiniz, tarayıcı türünüz, işletim sisteminiz gibi teknik bilgiler</li>
                            <li>Web sitemizdeki etkileşimleriniz ve hizmetlerimizle ilgili tercihleriniz</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Bilgi Kullanımı</h2>
                        <p className="text-gray-700 mb-4">Topladığımız bilgileri aşağıdaki amaçlarla kullanabiliriz:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                            <li>Müşteri desteği sağlamak</li>
                            <li>Güvenlik önlemlerini uygulamak</li>
                            <li>Yasal yükümlülükleri yerine getirmek</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Bilgi Paylaşımı</h2>
                        <p className="text-gray-700 mb-4">
                            Kişisel bilgilerinizi üçüncü taraflarla paylaşmayız, ancak aşağıdaki durumlar dışındadır:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Yasal zorunluluklar gereği</li>
                            <li>Hizmet sağlayıcılarımızla (veri işleme sözleşmeleri çerçevesinde)</li>
                            <li>Müşteri onayı ile</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Çerezler</h2>
                        <p className="text-gray-700 mb-4">
                            Web sitemizde çerezler kullanıyoruz. Çerezler hakkında daha fazla bilgi için lütfen <Link href="/kullanim-sartlari" className="text-blue-600 hover:underline">Kullanım Şartları</Link> sayfamızı ziyaret edin.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Güvenlik</h2>
                        <p className="text-gray-700 mb-4">
                            Kişisel bilgilerinizi korumak için uygun teknik ve organizasyonel önlemler alıyoruz. Ancak, internet üzerinden iletilen hiçbir veri %100 güvenli değildir.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Kişisel Veri Sahibinin Hakları</h2>
                        <p className="text-gray-700 mb-4">Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>Kişisel verilerinize erişim talep etme</li>
                            <li>Kişisel verilerinizin düzeltilmesini veya silinmesini talep etme</li>
                            <li>İtiraz etme ve şikayette bulunma</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Değişiklikler</h2>
                        <p className="text-gray-700 mb-4">
                            Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanacaktır.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. İletişim</h2>
                        <p className="text-gray-700 mb-4">
                            Gizlilik Politikası'mız hakkında sorularınız varsa, lütfen bizimle <Link href="/iletisim" className="text-blue-600 hover:underline">iletişime geçin</Link>.
                        </p>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                <ArrowRight className="mr-2" size={16} />
                                Ana Sayfaya Dön
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}