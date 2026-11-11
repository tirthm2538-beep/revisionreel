import { StoryCardData } from '../types/card';
import { SAMPLE_CARDS } from '../data/sampleCards';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchCards(subject?: string): Promise<{
  cards: StoryCardData[];
  source: 'backend' | 'fallback';
}> {
  try {
    const url = new URL(`${API_BASE_URL}/cards`);
    if (subject && subject !== 'all') {
      url.searchParams.set('subject', subject);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { cards: data, source: 'backend' };
      }
    }
  } catch {
    // API offline or timed out; seamlessly use rich local sample cards
  }

  const filtered =
    subject && subject !== 'all'
      ? SAMPLE_CARDS.filter((c) => c.subject === subject)
      : SAMPLE_CARDS;

  return { cards: filtered, source: 'fallback' };
}
