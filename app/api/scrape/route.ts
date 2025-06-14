// this is route for scraping news from the web

import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDb } from '@/app/lib/mongodb/db';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type NewsItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  source: string;
}

// EXTRACT: Scrape news from websites
async function scrapeABSCBN() {
  try {
    const response = await axios.get('https://news.abs-cbn.com/latest');
    const $ = cheerio.load(response.data);
    const news: NewsItem[] = [];

    $('.article-item').each((i, element) => {
      const title = $(element).find('.article-title').text().trim();
      const link = $(element).find('a').attr('href');
      const imageUrl = $(element).find('img').attr('src');
      
      if (title && link) {
        news.push({
          id: i,
          title,
          description: title, // Will be transformed by Gemini
          imageUrl: imageUrl || 'https://via.placeholder.com/150',
          link: link.startsWith('http') ? link : `https://news.abs-cbn.com${link}`,
          source: 'ABS-CBN'
        });
      }
    });

    return news;
  } catch (error) {
    console.error('Error scraping ABS-CBN:', error);
    return [];
  }
}

// TRANSFORM: Use Gemini to summarize articles
async function transformWithGemini(news: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Transform each news item
    const transformedNews = await Promise.all(
      news.map(async (item) => {
        const prompt = `Summarize this news article in 2-3 sentences: ${item.description}`;
        const result = await model.generateContent(prompt);
        const summary = await result.response.text();
        
        return {
          ...item,
          description: summary,
          transformedAt: new Date()
        };
      })
    );

    return transformedNews;
  } catch (error) {
    console.error('Error transforming with Gemini:', error);
    return news; // Return original data if transformation fails
  }
}

// LOAD: Store in MongoDB
async function loadToMongoDB(news: any[]) {
  try {
    const db = await getDb();
    
    // Add timestamps
    const newsWithTimestamps = news.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert into MongoDB
    const result = await db.collection('news').insertMany(newsWithTimestamps);
    
    return result;
  } catch (error) {
    console.error('Error loading to MongoDB:', error);
    throw error;
  }
}

// Main ETL process
export async function GET() {
  try {
    // EXTRACT
    console.log('Starting extraction...');
    const [absCbnNews] = await Promise.all([
      scrapeABSCBN(),

    ]);
    const allNews = [...absCbnNews];
    console.log(`Extracted ${allNews.length} news items`);

    // TRANSFORM
    console.log('Starting transformation with Gemini...');
    const transformedNews = await transformWithGemini(allNews);
    console.log('Transformation completed');

    // LOAD
    console.log('Loading to MongoDB...');
    const result = await loadToMongoDB(transformedNews);
    console.log(`Loaded ${result.insertedCount} items to MongoDB`);

    return NextResponse.json({ 
      success: true, 
      message: 'ETL process completed',
      stats: {
        extracted: allNews.length,
        transformed: transformedNews.length,
        loaded: result.insertedCount
      }
    });
  } catch (error) {
    console.error('Error in ETL process:', error);
    return NextResponse.json(
      { error: 'Failed to complete ETL process' },
      { status: 500 }
    );
  }
}

