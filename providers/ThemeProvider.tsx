'use client';

import { ThemeProvider as Provider } from 'next-themes';

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  return <Provider attribute='class'>{children}</Provider>;
}
