import Navbar from '@/components/sections/Navbar';
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
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
