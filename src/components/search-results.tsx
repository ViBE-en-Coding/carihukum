'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, FileText, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchDocuments, parseHighlights } from '@/lib/search-api';
import { SearchResult, SearchResponse } from '@/types/search';

interface SearchResultsProps {
  readonly query: string;
  readonly page: number;
  readonly category?: string;
  readonly year?: string;
  readonly onSearchComplete?: (response: SearchResponse) => void;
}

export function SearchResults({
  query,
  page,
  category,
  year,
  onSearchComplete,
}: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to store the latest callback to avoid dependency issues
  const onSearchCompleteRef = useRef(onSearchComplete);
  onSearchCompleteRef.current = onSearchComplete;

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchDocuments({
          query,
          page,
          category,
          year,
        });

        setResults(response.results);
        onSearchComplete?.(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch search results';
        setError(errorMessage);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, page, category, year, onSearchComplete]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Mencari dokumen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-medium">Terjadi kesalahan</h3>
        <p className="mt-2 text-muted-foreground">
          {error}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Silakan coba lagi atau gunakan kata kunci yang berbeda
        </p>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium">Tidak ada hasil yang ditemukan</h3>
        <p className="mt-2 text-muted-foreground">
          Coba gunakan kata kunci yang berbeda atau filter yang lebih umum
        </p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium">Masukkan kata kunci pencarian</h3>
        <p className="mt-2 text-muted-foreground">
          Gunakan kotak pencarian di atas untuk mencari dokumen hukum
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card
          key={result.id}
          className="overflow-hidden transition-shadow hover:shadow-md"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-md bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 font-medium">
                    <a
                      href={`/document/${result.id}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >                      {result.highlights?.['metadata.Judul']?.[0] ? (
                        <span 
                          dangerouslySetInnerHTML={{
                            __html: parseHighlights(result.highlights['metadata.Judul'][0])
                          }}
                        />
                      ) : (
                        result.title
                      )}
                      <ArrowUpRight className="h-3 w-3 opacity-70" />
                    </a>
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">
                      {result.type}
                    </Badge>
                    {result.score && (
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(result.score * 100) / 100}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {result.date}
                  </span>
                  <span>No. {result.number}</span>
                </div>                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {result.highlights?.['abstrak']?.[0] ? (
                    <span 
                      dangerouslySetInnerHTML={{
                        __html: parseHighlights(result.highlights['abstrak'][0])
                      }}
                    />
                  ) : (
                    result.excerpt
                  )}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {result.files && result.files.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {result.files.length} file{result.files.length > 1 ? 's' : ''} tersedia
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
