'use client';

import { useQuery } from '@tanstack/react-query';
import { getCampers } from '@/lib/api';
import CamperCard from '@/components/CamperCard/CamperCard';
import css from './page.module.css';

export default function CatalogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campers'],
    queryFn: () => getCampers({}),
  });

  if (isLoading) return <p className={css.message}>Loading...</p>;
  if (isError) return <p className={css.message}>Something went wrong.</p>;

  return (
    <main className={css.page}>
      <ul className={css.list}>
        {data?.campers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>
    </main>
  );
}
