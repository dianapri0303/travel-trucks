'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCampers } from '@/lib/api';
import CamperCard from '@/components/CamperCard/CamperCard';
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel';
import type { CamperFilters } from '@/types/camper';
import css from './page.module.css';

export default function CatalogPage() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam }) =>
      getCampers({ ...filters, page: pageParam, perPage: 4 }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = data?.pages.flatMap(page => page.campers) ?? [];

  return (
    <main className={css.page}>
      <FiltersPanel onSearch={setFilters} />

      <section className={css.results}>
        {isLoading && <p className={css.message}>Loading...</p>}
        {isError && <p className={css.message}>Something went wrong.</p>}
        {!isLoading && !isError && campers.length === 0 && (
          <p className={css.message}>No campers found.</p>
        )}
        {campers.length > 0 && (
          <>
            <ul className={css.list}>
              {campers.map(camper => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </ul>

            {hasNextPage && (
              <div className={css.loadMoreBox}>
                <button
                  type="button"
                  className={css.loadMoreBtn}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
