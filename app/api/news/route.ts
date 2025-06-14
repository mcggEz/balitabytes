import { NextResponse } from 'next/server';
import { getDb } from '@/app/lib/mongodb/db';
import { News } from '@/app/models/news';

export async function GET() {
  try {
    const db = await getDb();
    const news = await db
      .collection('news')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const body = await request.json();
    
    const news = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('news').insertOne(news);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}