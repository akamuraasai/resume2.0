'use client';

import { useEffect, useState } from 'react';
import { useHash } from '@resume/hooks/useHash';
import Typography from '@resume/components/Typography';

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
  
  const languageSelected = (language: string) => 
    actualLanguage === language ? 'text-neutral-950' : 'text-neutral-100';

  return (
    <div className="flex flex-row gap-2 items-center justify-center fixed top-[32px] right-[32px] print:hidden">
      <Typography type="body2" link="#en-US" className={`${languageSelected('en-US')} cursor-pointer`}>
        ENGLISH
      </Typography>
      |
      <Typography type="body2" link="#pt-BR" className={`${languageSelected('pt-BR')} cursor-pointer`}>
        PORTUGUÊS
      </Typography>
    </div>
  );
}