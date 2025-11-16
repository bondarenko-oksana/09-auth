import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { NoteTag } from '../../types/note';

export interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: Draft;
  setDraft: (partial: Partial<Draft>) => void;
  replaceDraft: (next: Draft) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (partial) =>
        set((state) => ({
          draft: { ...state.draft, ...partial },
        })),
      replaceDraft: (next) => set({ draft: next }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-note-draft', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { initialDraft };
