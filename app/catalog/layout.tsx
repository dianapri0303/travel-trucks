import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | TravelTrucks',
  description:
    'Browse our full catalog of campervans. Filter by location, type, and amenities.',
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
