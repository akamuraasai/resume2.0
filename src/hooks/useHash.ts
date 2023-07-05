'use client';

import { useEffect } from 'react';
import { cookies } from 'next/headers';

export const useHash = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'en-US' || hash === 'pt-BR') {
        cookies().set('lang', hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
};
