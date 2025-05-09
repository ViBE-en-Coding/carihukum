import { ArrowUpRight, FileText, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMockSearchResults } from '@/lib/mock-data';

interface SearchResultsProps {
  query: string;
  page: number;
  category?: string;
  year?: string;
}

export function SearchResults({
  query,
  page,
  category,
  year,
}: SearchResultsProps) {
  // In a real app, this would fetch from an API
  const results = getMockSearchResults(query, page, category, year);

  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium">Tidak ada hasil yang ditemukan</h3>
        <p className="mt-2 text-muted-foreground">
          Coba gunakan kata kunci yang berbeda atau filter yang lebih umum
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
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 font-medium">
                    <a
                      href={`/document/${result.id}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {result.title}
                      <ArrowUpRight className="h-3 w-3 opacity-70" />
                    </a>
                  </h3>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {result.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {result.date}
                  </span>
                  <span>No. {result.number}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {result.excerpt}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
