'use client';

import React, { useEffect, useState } from 'react';
import { getMe, updateMe } from '../../../../lib/api/clientApi';
import { useAuthStore } from '../../../../lib/store/authStore';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import Image from 'next/image';

const EditProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(!user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const me = await getMe();
        setUser(me);
        setUsername(me.username);
        setLoading(false);
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMe({ username });
    setUser({ ...user, username });
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {user.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;