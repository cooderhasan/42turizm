import { NextResponse } from 'next/server';
import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const result = await db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.order);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json([], { status: 500 });
    }
}