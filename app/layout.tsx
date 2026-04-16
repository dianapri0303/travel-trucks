import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-family' });

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rentals',
  description:
    'Find and book your perfect campervan. Browse our catalog of campers available across Ukraine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryProvider>
          <Toaster position="top-right" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
