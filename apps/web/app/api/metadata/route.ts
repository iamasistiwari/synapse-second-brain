import { NextResponse } from 'next/server';
import metascraper from 'metascraper';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import metascraperDescription from 'metascraper-description';
import got from 'got';
import Keyv from 'keyv';

const cache = new Keyv({ store: new Map() });

const scraper = metascraper([
  metascraperImage(),
  metascraperTitle(),
  metascraperUrl(),
  metascraperDescription(),
]);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url)
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    const cachedData = await cache.get(url);
    if (cachedData) return NextResponse.json(cachedData);

    const { body } = await got(url);
    const metadata = await scraper({ html: body, url });

    await cache.set(url, metadata, 1000 * 60 * 10 * 20);
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
