import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.scss';

export const metadata = {
  title: 'Icut',
  description: 'Barbershop system',
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
