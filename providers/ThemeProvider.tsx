'use client';

import { ThemeProvider as Provider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <Provider {...props}>{children}</Provider>;
}
