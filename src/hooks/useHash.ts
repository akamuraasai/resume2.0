'use client';

import { useEffect } from 'react';

export const useHash = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'en-US' || hash === 'pt-BR') {
        document.cookie = `lang=${hash}; path=/`;
        window.location.reload();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
};
