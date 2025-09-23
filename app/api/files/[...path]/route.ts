import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import mime from 'mime';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = join('/uploads', ...params.path);
    
    // Check if file exists
    await stat(filePath);
    
    // Read file
    const file = await readFile(filePath);
    
    // Get mime type
    const mimeType = mime.getType(filePath) || 'application/octet-stream';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}