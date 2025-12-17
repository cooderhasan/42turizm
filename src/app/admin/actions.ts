'use server'

import * as bcrypt from 'bcryptjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email ve şifre gereklidir.' };
    }

    // ... imports

    try {
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (user.length === 0) {
            return { error: 'Kullanıcı bulunamadı.' };
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return { error: 'Hatalı şifre.' };
        }

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', user[0].id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Bir hata oluştu.' };
    }

    redirect('/admin/dashboard');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/login');
}
