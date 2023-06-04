import './globals.scss';
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Icut',
  description: 'Barbershop system'
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
