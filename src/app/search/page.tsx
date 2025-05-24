'use client';

import { useState, Suspense, use, useCallback } from 'react';
import { SearchForm } from '@/components/search-form';
import { SearchResults } from '@/components/search-results';
import { SearchFilters } from '@/components/search-filters';
import { SearchPagination } from '@/components/search-pagination';
import { SearchSkeleton } from '@/components/search-skeleton';
import { AiOverview } from '@/components/ai-overview';
import { SearchResponse } from '@/types/search';

export default function SearchPage({
  searchParams,
}: {
  readonly searchParams: Promise<{
    q: string;
    page?: string;
    category?: string;
    year?: string;
  }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const query = resolvedSearchParams.q ?? '';
  const page = Number(resolvedSearchParams.page) || 1;
  const category = resolvedSearchParams.category ?? '';
  const year = resolvedSearchParams.year ?? '';
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(
    null
  );

  const handleSearchComplete = useCallback((response: SearchResponse) => {
    setSearchResponse(response);
  }, []);

  const totalPages = searchResponse
    ? Math.ceil(searchResponse.total / searchResponse.limit)
    : 0;

  const resultStart = searchResponse
    ? (searchResponse.page - 1) * searchResponse.limit + 1
    : 0;

  const resultEnd = searchResponse
    ? Math.min(searchResponse.page * searchResponse.limit, searchResponse.total)
    : 0;

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tighter">
              Cari<span className="text-primary">Hukum</span>
            </a>
            <div className="mx-4 w-full max-w-xl">
              <SearchForm initialQuery={query} compact />
            </div>
          </div>
        </div>
      </header>
      <div className="container flex-1 py-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="shrink-0 md:w-64">
            <SearchFilters
              selectedCategory={category}
              selectedYear={year}
              query={query}
            />
          </div>
          <div className="flex-1">
            {' '}
            <div className="mb-4">
              <h1 className="text-xl font-semibold">
                Hasil pencarian untuk "{query}"
              </h1>{' '}
              {searchResponse && searchResponse.total > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Menampilkan hasil {resultStart}-{resultEnd} dari{' '}
                  {searchResponse.total.toLocaleString('id-ID')} hasil
                  {Boolean(searchResponse.took) && (
                    <span className="ml-2">
                      ({(searchResponse.took / 1000).toFixed(2)} detik)
                    </span>
                  )}
                </p>
              ) : (
                query &&
                searchResponse && (
                  <p className="text-sm text-muted-foreground">
                    Tidak ada hasil ditemukan
                  </p>
                )
              )}
            </div>
            {/* AI Overview section */}
            {query && <AiOverview query={query} />}{' '}
            <Suspense fallback={<SearchSkeleton />}>
              <SearchResults
                query={query}
                page={page}
                category={category}
                year={year}
                onSearchComplete={handleSearchComplete}
              />
            </Suspense>
            {searchResponse && searchResponse.total > 0 && (
              <div className="mt-6">
                <SearchPagination
                  currentPage={page}
                  totalPages={totalPages}
                  query={query}
                  category={category}
                  year={year}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CariHukum. Semua hak dilindungi.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Tentang Kami
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Syarat Penggunaan
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
