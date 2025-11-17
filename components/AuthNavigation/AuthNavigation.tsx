'use client';

import React from 'react';
import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '../../lib/store/authStore';
import { logout } from '../../lib/api/clientApi';
import { useRouter } from 'next/navigation';

const AuthNavigation: React.FC = () => {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  if (isAuthenticated && user) {
    return (
      <ul className={css.navigation}>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className={css.navigation}>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </ul>
  );
};

export default AuthNavigation;