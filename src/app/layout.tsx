import './globals.css';

export const metadata = {
  title: 'Icut',
  description: 'Barbershop system'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body>{children}</body>
    </html>
  );
}
