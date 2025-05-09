import type { Metadata } from 'next';
import './globals.css';
import { Lexend } from 'next/font/google';

export const metadata: Metadata = {
  title: 'CariHukum',
  description: 'Platform pencarian informasi hukum yang cepat dan terpercaya.',
};

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.className}>
      <body>{children}</body>
    </html>
  );
}
