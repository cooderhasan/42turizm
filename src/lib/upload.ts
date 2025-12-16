import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) {
        return null;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `image-${uniqueSuffix}.${ext}`;

    // Path to save the file (public/uploads)
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    try {
        await writeFile(filepath, buffer);
        console.log(`File saved to ${filepath}`);
        return `/api/uploads/${filename}`;
    } catch (error) {
        console.error('Error saving file:', error);
        return null; // Handle error gracefully
    }
}
