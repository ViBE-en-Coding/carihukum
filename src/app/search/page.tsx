import { Suspense } from 'react';
import { SearchForm } from '@/components/search-form';
import { SearchResults } from '@/components/search-results';
import { SearchFilters } from '@/components/search-filters';
import { SearchPagination } from '@/components/search-pagination';
import { SearchSkeleton } from '@/components/search-skeleton';
import { AiOverview } from '@/components/ai-overview';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page?: string; category?: string; year?: string };
}) {
  const query = searchParams.q || '';
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category || '';
  const year = searchParams.year || '';

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
            <div className="mb-4">
              <h1 className="text-xl font-semibold">
                Hasil pencarian untuk "{query}"
              </h1>
              <p className="text-sm text-muted-foreground">
                Menampilkan hasil {(page - 1) * 10 + 1}-{page * 10} dari sekitar
                120 hasil
              </p>
            </div>

            {/* AI Overview section */}
            {query && <AiOverview query={query} />}

            <Suspense fallback={<SearchSkeleton />}>
              <SearchResults
                query={query}
                page={page}
                category={category}
                year={year}
              />
            </Suspense>
            <div className="mt-6">
              <SearchPagination
                currentPage={page}
                totalPages={12}
                query={query}
                category={category}
                year={year}
              />
            </div>
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
