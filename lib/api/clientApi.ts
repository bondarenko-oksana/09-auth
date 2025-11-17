/*import { api } from './api';
import type { Note, NoteTag } from '../../types/note';
import type { User } from '../../types/user';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: { title: string; content?: string; tag: NoteTag }): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export async function login(payload: AuthRequest): Promise<User> {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
}

export async function register(payload: AuthRequest): Promise<User> {
  const { data } = await api.post<User>('auth/register', payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User | null>('/auth/session');
  return data || null;
}
export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
}*/
import { api } from "./api";
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...params,
      perPage: params.perPage ?? 12,
      ...(params.tag ? { tag: params.tag } : {}),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: {
  title: string;
  content?: string;
  tag: NoteTag;
}): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export async function login(payload: AuthRequest): Promise<User> {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
}

export async function register(payload: AuthRequest): Promise<User> {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User | null>("/auth/session");
  return data ?? null;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}
