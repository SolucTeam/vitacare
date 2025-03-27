
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language || 'fr');

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        isFirstVisit,
        setIsFirstVisit,
        changeLanguage,
        currentLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
