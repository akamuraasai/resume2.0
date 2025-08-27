'use client';

import { useEffect, useState } from 'react';
import { useHash } from '@resume/hooks/useHash';

interface LanguageSelectorProps {
  currentLanguage: string;
}

export default function LanguageSelector({ currentLanguage }: LanguageSelectorProps) {
  const [actualLanguage, setActualLanguage] = useState(currentLanguage);
  
  useHash();
  
  useEffect(() => {
    const checkLanguageChange = () => {
      const langMatch = document.cookie.match(/lang=([^;]+)/);
      if (langMatch && langMatch[1] !== actualLanguage) {
        setActualLanguage(langMatch[1]);
      }
    };
    
    const interval = setInterval(checkLanguageChange, 100);
    return () => clearInterval(interval);
  }, [actualLanguage]);

  return (
    <div className="fixed top-[32px] right-[32px] print:hidden">
      <div className="flex flex-row bg-neutral-800 rounded-full p-1 shadow-lg">
        <a
          href="#en-US"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            actualLanguage === 'en-US'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          EN
        </a>
        <a
          href="#pt-BR"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            actualLanguage === 'pt-BR'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          PT
        </a>
      </div>
    </div>
  );
}