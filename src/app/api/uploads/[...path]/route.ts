
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: pathArray } = await params;

    // Construct the file path
    // We assume files are stored in public/uploads based on our action logic
    // But since we are in standalone mode, we might want to read from the persistent loc if mounted there?
    // For now, let's keep it consistent with where we WRITE: process.cwd() + /public/uploads

    const filePath = path.join(process.cwd(), 'public', 'uploads', ...pathArray);

    if (!fs.existsSync(filePath)) {
        return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.getType(filePath) || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
