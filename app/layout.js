import LoadingScreen from '@/components/globals/LoadingScreen';
import Navbar from '@/components/globals/Navbar';
import PageTransition from '@/components/globals/PageTransition';
import RotateMessage from '@/components/globals/RotateMessage';
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
  authors: [{ name: 'Danu Pratama', url: 'https://danu.is-a.dev' }],
  openGraph: {
    title: 'Danu Pratama | Web Developer',
    description: 'Portfolio — Creating engaging digital experiences through clean design and thoughtful development.',
    url: 'https://danu.is-a.dev',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <meta name="google-site-verification" content="CHNS67Hvsj7-6xW7W3gb_e2a93ojk8n1a7O6udP64Qs" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>

      <body>
        <LoadingScreen />
        <Navbar />
        <PageTransition />
        <RotateMessage />
        {children}
      </body>
    </html>
  );
}
