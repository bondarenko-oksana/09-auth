/*import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../../types/note';
import type { User } from '../../types/user';


const BASE_URL = process.env.API_URL + "/api"; 



//const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';
//const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function fetchNotes(params?: { page?: number; perPage?: number; search?: string; tag?: string }) {
  const { data } = await serverApi.get<{ notes: Note[]; totalPages: number }>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await serverApi.get<Note>(`/notes/${id}`);
  return data;
}

export async function getMe(cookies?: string) {
  const { data } = await serverApi.get<User>('/users/me', {
    headers: cookies ? { Cookie: cookies } : undefined,
  });
  return data;
}
export async function checkSession(cookies?: string): Promise<AxiosResponse<User | null>> {
  return await serverApi.get<User | null>('/auth/session', {
    headers: cookies ? { Cookie: cookies } : undefined,
  });
}*/
import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

//const BASE_URL = process.env.API_URL + "/api";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const serverApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export async function fetchNotes(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) {
  const cookieStore = await cookies();

  const { data } = await serverApi.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params: {
      ...params,
      perPage: params?.perPage ?? 12,
      ...(params?.tag ? { tag: params.tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();

  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
}

export async function getMe(cookiesString?: string) {
  const cookieStore = cookiesString ?? (await cookies()).toString();

  const { data } = await serverApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore },
  });

  return data;
}

export async function checkSession(cookiesString?: string) {
  const cookieStore = cookiesString ?? (await cookies()).toString();

  return await serverApi.get<User | null>("/auth/session", {
    headers: { Cookie: cookieStore },
  });
}