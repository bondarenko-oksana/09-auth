/*import { Metadata } from "next";
import css from './ProfilePage.module.css';
import { getMe } from '../../../lib/api/serverApi';
import Link from "next/link";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "Your personal profile page in NoteHub",
  openGraph: {
    title: "Profile | NoteHub",
    description: "Your personal profile page in NoteHub",
    url: `${BASE_URL}`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "Profile",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Profile | NoteHub",
    description: "Your personal profile page in NoteHub",
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default async function ProfilePage() {
  const profile = await getMe();

  if (!profile) {
    return (
      <main className={css.mainContent}>
        <p>User not found or not authorized.</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={profile.avatar || "/placeholder.png"}
            alt={profile.username || "User Avatar"}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      </div>
    </main>
  );
}*/

import { Metadata } from "next";
import css from "./ProfilePage.module.css";
import { getMe } from "../../../lib/api/serverApi";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "Your personal profile page in NoteHub",
  openGraph: {
    title: "Profile | NoteHub",
    description: "Your personal profile page in NoteHub",
    url: `${BASE_URL}`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile | NoteHub",
    description: "Your personal profile page in NoteHub",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default async function ProfilePage() {
 
  const cookieStore = await cookies();
const cookieHeader = cookieStore.getAll()
  .map(c => `${c.name}=${c.value}`)
  .join("; ");


  let profile = null;
  try {
    profile = await getMe(cookieHeader);
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  }

  if (!profile) {
    return (
      <main className={css.mainContent}>
        <p>User not found or not authorized.</p>
        <Link href="/sign-in">Go to Sign In</Link>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
      <Image
        src={profile.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
        alt="User avatar"
        width={120}
        height={120}
      />
      <Link href="/profile/edit">Edit Profile</Link>
    </main>
  );
}
