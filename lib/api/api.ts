
/*import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

import type { Note } from "../../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export interface CheckSession {
  success: boolean;
}*/
/*import axios from 'axios';
import type { Note } from "../../types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const api = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export interface CheckSession {
  success: boolean;
}*/

import axios from "axios";
import type { Note } from "../../types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface CheckSession {
  success: boolean;
}

