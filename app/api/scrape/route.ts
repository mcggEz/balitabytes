import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    console.log('Attempting to fetch GMA News...');
    const response = await axios.get('https://www.gmanetwork.com/news/');
    console.log('Response status:', response.status);
    
    const $ = cheerio.load(response.data);
    
    // Get all a tags and log them
    $('a').each((i, element) => {
      const link = $(element).attr('href');
      const text = $(element).text().trim();
      
      if (link) {
        console.log(`Link ${i}:`, {
          href: link,
          text: text
        });
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch links',
      details: error.message 
    }, { status: 500 });
  }
}