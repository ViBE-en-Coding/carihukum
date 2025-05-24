import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGFM from 'remark-gfm';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface AiOverviewProps {
  query: string;
  contents: string[];
}

const prompt = (props: AiOverviewProps) => `
Anda adalah asisten AI untuk mesin pencarian hukum.
Berikan ringkasan SINGKAT dan PADAT (maksimal 3-4 paragraf) tentang: "${props.query}".
Fokus pada aspek hukum paling relevan berdasarkan hasil pencarian berikut:
${props.contents.map((content, index) => `Hasil ${index + 1}: ${content}`).join('\n')}
`

export function AiOverview({ query, contents }: AiOverviewProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const getSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/v1/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt({ query, contents }) }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI summary');
      }

      const data = await response.json();
      setSummary(data.summary);
      return data.summary;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return 'Maaf, terjadi kesalahan dalam memuat ringkasan AI.';
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (query && contents?.length > 0) {
      getSummary();
    }
  }, [query, contents]);

  if (error) return null;

  return (
    <Card className="mb-6 bg-blue-50">
      <CardHeader className="pb-3 bg-blue-50">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Bot className={cn("h-5 w-5 text-primary",
            loading && "animate-pulse"
          )} />
          {loading ? <Skeleton className="h-4 w-1/2 bg-blue-100" /> : query}
        </CardTitle>
      </CardHeader>
      <CardContent className='bg-blue-50'>
        {loading ? (
          <div className="space-y-2 mb-3">
            <Skeleton className="h-4 w-full bg-blue-100" />
            <Skeleton className="h-4 w-[90%] bg-blue-100" />
            <Skeleton className="h-4 w-[95%] bg-blue-100" />
            <Skeleton className="h-4 w-[85%] bg-blue-100" />
          </div>
        ) : (
          <div className="mb-3 text-sm text-muted-foreground prose max-w-none bg-blue-50 opacity-80 prose-strong:opacity-80">
            <Markdown remarkPlugins={[remarkGFM]}>
              {summary}
            </Markdown>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          AI dapat melakukan kesalahan. Verifikasi informasi penting.
        </div>
      </CardContent>
    </Card>
  );
}
