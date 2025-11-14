"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Or a spinner component
    }

    if (!user) {
      return null; // Or a redirect component
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;