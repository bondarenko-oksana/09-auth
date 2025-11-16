import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient, { NOTES_QUERY_KEY } from '../[...slug]/Notes.client';
import type { Metadata } from 'next';

interface FilteredNotesPageProps {
  params: { slug?: string[] } | Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const slug = params.slug;
  const tag: string | undefined = slug?.[0] === 'all' ? undefined : slug?.[0];
  const title = tag ? `Notes — ${tag} — NoteHub` : 'Notes — All — NoteHub';
  const description = tag
    ? `Notes filtered by tag: ${tag}. Browse and manage your notes.`
    : 'All notes. Browse and manage your notes.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag ?? 'all'}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage(props: FilteredNotesPageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const tag: string | undefined = slug?.[0] === 'all' ? undefined : slug?.[0];
  const page = 1;
  const search = '';
  const queryKey = [NOTES_QUERY_KEY, page, search, tag];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        ...(tag ? { tag } : {}),
      }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}