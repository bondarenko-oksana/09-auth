import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { checkSession } from '../../lib/api/clientApi';
import Loader from '../Loader/Loader';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { setUser, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else clearIsAuthenticated();
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [setUser, clearIsAuthenticated]);

  useEffect(() => {
    if (!loading) {
      const privatePaths = ['/profile', '/notes'];
      const publicPaths = ['/sign-in', '/sign-up'];

      if (!isAuthenticated && privatePaths.some((p) => pathname.startsWith(p))) {
        router.push('/sign-in');
      }
      if (isAuthenticated && publicPaths.some((p) => pathname.startsWith(p))) {
        router.push('/profile');
      }
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default AuthProvider;