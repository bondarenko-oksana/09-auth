import NoteForm from '@/components/NoteForm/NoteForm';
import css from '@/components/Home/Home.module.css'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description: 'Create a new note in NoteHub. Save drafts automatically while typing.',
  openGraph: {
    title: 'Create note — NoteHub',
    description: 'Create a new note in NoteHub. Save drafts automatically while typing.',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "logo",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.container}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
           <NoteForm />
      </div>
    </main>
  );
}