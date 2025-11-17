import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';;
import NotesClient, { NOTES_QUERY_KEY } from './Notes.client';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FilteredNotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata(
  props: FilteredNotesPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];
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
      url: `${BASE_URL}/notes/filter/${tag ?? 'all'}`,
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
 
  const { slug } = await props.params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];
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