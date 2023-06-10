import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ClientProvider } from '~/appRoot/presentation/components';

export const metadata = {
  title: 'Icut',
  description: 'Barbershop system',
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <body className={poppins.className}>
        <ToastContainer />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
