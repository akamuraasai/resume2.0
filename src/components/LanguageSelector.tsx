'use client';

import { useEffect, useState } from 'react';
import { useHash } from '@resume/hooks/useHash';

interface LanguageSelectorProps {
  currentLanguage: string;
}

export default function LanguageSelector({ currentLanguage }: LanguageSelectorProps) {
  const [actualLanguage, setActualLanguage] = useState(currentLanguage);
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleLanguageChange = (e: React.MouseEvent<HTMLAnchorElement>, language: string) => {
    if (isLoading || actualLanguage === language) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center print:hidden">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-200 border-t-neutral-600"></div>
          </div>
        </div>
      )}
      
      <div className="fixed top-[32px] right-[32px] print:hidden z-50">
        <div className="flex flex-row bg-neutral-800 rounded-full p-1 shadow-lg">
          <a
            href="#en-US"
            onClick={(e) => handleLanguageChange(e, 'en-US')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              actualLanguage === 'en-US'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
          >
            EN
          </a>
          <a
            href="#pt-BR"
            onClick={(e) => handleLanguageChange(e, 'pt-BR')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              actualLanguage === 'pt-BR'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
          >
            PT
          </a>
        </div>
      </div>
    </>
  );
}