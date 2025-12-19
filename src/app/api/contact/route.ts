import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';

export async function GET() {
    return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>API Endpoint</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #333; }
                p { color: #666; line-height: 1.6; }
                a { color: #007bff; text-decoration: none; }
                a:hover { text-decoration: underline; }
                .btn { display: inline-block; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; margin-top: 20px; text-decoration: none; }
                .btn:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📧 İletişim API</h1>
                <p>Bu bir API endpoint'i. Tarayıcıdan direkt erişilemez.</p>
                <p>Lütfen <a href="/iletisim">İletişim Formu</a> sayfasını kullanın.</p>
                <a href="/iletisim" class="btn">İletişim Formuna Git</a>
            </div>
        </body>
        </html>
    `, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
    });
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                message: 'Lütfen tüm zorunlu alanları doldurun.'
            }, { status: 400 });
        }

        // Spam prevention checks
        const spamChecks = [
            // Check for minimum message length
            { condition: message.length < 10, message: 'Mesajınız çok kısa. Lütfen en az 10 karakter girin.' },

            // Check for excessive links (common spam pattern)
            { condition: (message.match(/https?:\/\/[^\s]+/gi) || []).length > 2, message: 'Mesajınızda çok fazla link var. Lütfen en fazla 2 link kullanın.' },

            // Check for common spam keywords
            {
                condition: /(viagra|cialis|casino|poker|loan|credit|bitcoin|crypto|free money|win big|click here|limited offer|bahis|kumar|porno|sex|erotik|bonus|promosyon|bettürkiye|bet|slot|rulet|blackjack|yasa dışı|kaçak bahis|canlı casino|deneme bonusu|freespin)/i.test(message),
                message: 'Mesajınız spam olarak işaretlendi. Lütfen farklı içerik deneyin.'
            },

            // Check for excessive capitalization
            {
                condition: message.replace(/[^A-Z]/g, '').length > message.length * 0.5,
                message: 'Mesajınızda çok fazla büyük harf var. Lütfen normal yazım kullanın.'
            },

            // Check for repeated characters (common spam pattern)
            {
                condition: /(.)\1{10,}/.test(message),
                message: 'Mesajınız spam olarak işaretlendi. Tekrarlanan karakterler tespit edildi.'
            },

            // Check email format
            {
                condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: 'Geçersiz e-posta formatı. Lütfen geçerli bir e-posta adresi girin.'
            },

            // Check name length and content
            {
                condition: name.length < 2 || name.length > 50,
                message: 'Adınız çok kısa veya çok uzun. Lütfen gerçek adınızı girin.'
            },

            // Check for suspicious phone numbers
            {
                condition: phone && !/^[\d\s()+-]{8,20}$/.test(phone),
                message: 'Geçersiz telefon numarası formatı.'
            }
        ];

        const failedCheck = spamChecks.find(check => check.condition);
        if (failedCheck) {
            return NextResponse.json({
                success: false,
                message: failedCheck.message
            }, { status: 400 });
        }

        // Insert into database
        await db.insert(contactMessages).values({
            name,
            email,
            phone: phone || null,
            subject: subject || null,
            message,
            isRead: false,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
        });

    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json({
            success: false,
            message: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        }, { status: 500 });
    }
}