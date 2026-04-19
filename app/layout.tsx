import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-family' });

export const metadata: Metadata = {
  title: 'TravelTrucks | Camper Rentals',
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
        <TanStackProvider>
          <Toaster position="top-right" />
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
