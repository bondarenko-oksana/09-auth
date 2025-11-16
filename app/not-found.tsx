import css from '../components/Home/Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page not found — NoteHub',
  description: 'The requested page was not found in NoteHub.',
  openGraph: {
    title: '404 — Page not found — NoteHub',
    description: 'The requested page was not found in NoteHub.',
    url: 'https://your-site.example/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

