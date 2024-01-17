'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextProps = {
  mode: string;
  setMode: (mode: string) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const STORED_THEME = localStorage.getItem('theme');

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState('');

  const handleThemeChange = () => {
    if (typeof document === undefined) {
      document.documentElement.classList.add(STORED_THEME ?? '');
    }

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
