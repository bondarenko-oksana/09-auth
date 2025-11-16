import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next';

interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);
    return {
      title: `${note.title} — NoteHub`,
      description: note.content ? note.content.slice(0, 160) : `Details for note ${note.title}`,
      openGraph: {
        title: `${note.title} — NoteHub`,
        description: note.content ? note.content.slice(0, 160) : `Details for note ${note.title}`,
        url: `https://notehub.com/notes/${params.id}`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch (err) {
    console.error('Failed to fetch note:', err);
    return {
      title: 'Note details — NoteHub',
      description: 'Note details page',
      openGraph: {
        title: 'Note details — NoteHub',
        description: 'Note details page',
        url: `https://notehub.com/notes/${params.id}`,
      },
    };
  }
}

export default function NoteDetailsPage({ params }: { params: Params }) {
  return <NoteDetailsClient id={params.id} />;
}