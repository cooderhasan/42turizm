import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kullanım Şartları</h1>
                        <p className="text-gray-600">Son güncelleme: 13 Aralık 2025</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Kabul</h2>
                        <p className="text-gray-700 mb-4">
                            42 Turizm ("Şirket", "biz", "bize" veya "bizim") web sitemizi ziyaret ederek veya hizmetlerimizi kullanarak, bu Kullanım Şartları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Hizmetler</h2>
                        <p className="text-gray-700 mb-4">
                            Şirket, personel taşımacılığı, öğrenci servisi, VIP transfer ve filo kiralama gibi taşımacılık hizmetleri sunmaktadır. Hizmetlerimizin kapsamı ve koşulları, bu Kullanım Şartları'nda belirtilmiştir.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Kullanıcı Sorumlulukları</h2>
                        <p className="text-gray-700 mb-4">Kullanıcılar aşağıdakilerden sorumludur:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Sağladıkları bilgilerin doğru ve güncel olması</li>
                            <li>Hizmetlerimizi yasalara uygun şekilde kullanmak</li>
                            <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                            <li>Şirket politikalarına uymak</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Ücretler ve Ödeme</h2>
                        <p className="text-gray-700 mb-4">
                            Hizmetlerimizin ücretleri, rezervasyon sırasında belirtilir. Ödeme koşulları ve iptal politikaları, rezervasyon sırasında size bildirilecektir.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. İptal ve İade Politikası</h2>
                        <p className="text-gray-700 mb-4">
                            İptal ve iade politikamız, hizmet türüne göre değişebilir. Detaylı bilgi için lütfen bizimle iletişime geçin.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Fikri Mülkiyet</h2>
                        <p className="text-gray-700 mb-4">
                            Web sitemizdeki tüm içerik (metinler, görseller, logolar vb.) Şirket'e aittir ve fikri mülkiyet haklarıyla korunmaktadır. İzin almadan kullanılamaz.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Sınırlı Sorumluluk</h2>
                        <p className="text-gray-700 mb-4">
                            Şirket, hizmetlerimizin kullanımından doğabilecek herhangi bir dolaylı, özel veya sonuçsal zarardan sorumlu değildir.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Çerezler</h2>
                        <p className="text-gray-700 mb-4">
                            Web sitemizde çerezler kullanıyoruz. Çerezler, web sitemizin işlevselliğini artırmak ve kullanıcı deneyimini geliştirmek için kullanılır. Çerezleri devre dışı bırakabilirsiniz, ancak bu web sitemizin bazı özelliklerini etkileyebilir.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Değişiklikler</h2>
                        <p className="text-gray-700 mb-4">
                            Bu Kullanım Şartları'nı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanacaktır. Değişikliklerden sonra web sitemizi kullanmaya devam ederek, güncellenmiş Kullanım Şartları'nı kabul etmiş olursunuz.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. İletişim</h2>
                        <p className="text-gray-700 mb-4">
                            Kullanım Şartları'mız hakkında sorularınız varsa, lütfen bizimle <Link href="/iletisim" className="text-blue-600 hover:underline">iletişime geçin</Link>.
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