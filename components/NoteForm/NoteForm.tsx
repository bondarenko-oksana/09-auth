'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { createNote } from '../../lib/api';
import type { NoteTag } from '../../types/note';
import { useNoteStore, initialDraft } from '../../lib/store/noteStore';

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const [errors, setErrors] = useState<{ title?: string }>({});
  const initial = draft || initialDraft;

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();
      if (onSuccess) onSuccess();
      router.back();
    },
    onError: (error) => {
      console.error('Failed to create note', error);
    },
  });

   const onChange =
    (field: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setDraft({ [field]: e.target.value } as Partial<typeof initial>);
    };

  const validate = (values: { title: string }) => {
    const e: { title?: string } = {};
    if (!values.title || values.title.trim().length < 3) {
      e.title = 'Title must be at least 3 characters';
    } else if (values.title.trim().length > 50) {
      e.title = 'Title must be at most 50 characters';
    }
    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: String(formData.get('title') || '').trim(),
      content: String(formData.get('content') || '').trim(),
      tag: (String(formData.get('tag') || 'Todo') as NoteTag) || 'Todo',
    };

    const validation = validate({ title: payload.title });
    if (validation.title) {
      setErrors(validation);
      return;
    }

    mutate(payload);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <div>
      <h2>Create note</h2>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className={css.input}
            value={initial.title}
            onChange={onChange('title')}
            autoComplete="off"
            aria-invalid={!!errors.title}
          />
          <div className={css.error}>{errors.title}</div>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            value={initial.content}
            onChange={onChange('content')}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            value={initial.tag}
            onChange={onChange('tag')}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>

          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </form>
    </div>
  );
}