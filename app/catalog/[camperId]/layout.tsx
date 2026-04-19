import type { Metadata } from 'next';
import { getCamperById } from '@/lib/api';

type Props = {
  params: Promise<{ camperId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await getCamperById(camperId);
    return { title: `${camper.name} | TravelTrucks` };
  } catch {
    return { title: 'Camper details | TravelTrucks' };
  }
}

export default function CamperDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
