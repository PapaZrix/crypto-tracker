import ThemeProvider from '@/providers/ThemeProvider';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import Header from '@/components/layout/Header';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

const poppins = Poppins({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'CryptoTracker | Find your favorite coin',
  description: 'Check out your favorite coins and see their current and historic market movement',
  metadataBase: new URL('https://crypto-tracker-sepia-chi.vercel.app'),
  openGraph: {
    title: 'CryptoTracker | Find your favorite coin',
    url: 'https://crypto-tracker-sepia-chi.vercel.app',
    description: 'Check out your favorite coins and see their current and historic market movement',
    images: '/assets/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} ${poppins.variable} bg-gray-50 dark:bg-gray-900 dark:text-white scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-800`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
