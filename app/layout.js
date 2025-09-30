import LoadingScreen from '@/components/globals/LoadingScreen';
import Navbar from '@/components/globals/Navbar';
import PageTransition from '@/components/globals/PageTransition';
import './globals.css';

import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';

// Font Jakarta
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
});

// Font Playfair
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Danu Pratama | Web Developer',
  description: 'Portfolio — Creating engaging digital experiences through clean design and thoughtful development.',
  keywords: ['Danu Pratama', 'Web Developer', 'Programmer', 'Portfolio'],
  authors: [{ name: 'Danu Pratama', url: 'https://danupratama.vercel.app' }],
  openGraph: {
    title: 'Danu Pratama | Web Developer',
    description: 'Portfolio — Creating engaging digital experiences through clean design and thoughtful development.',
    url: 'https://danupratama.vercel.app',
    siteName: 'Danu — Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 720,
        height: 711,
        alt: 'Preview Danu Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        <LoadingScreen />
        <Navbar />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
