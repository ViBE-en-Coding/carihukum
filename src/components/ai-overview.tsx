import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface AiOverviewProps {
  query: string;
  contents: string[];
}

const prompt = (props: AiOverviewProps) => `
Anda adalah seorang asiten AI yang melakukan ringkasan informasi pada suatu halaman mesin pencarian hukum (SERP summary).
Anda diberikan query berikut: "${props.query}".
Berdasarkan query tersebut, berikan ringkasan informasi hukum yang relevan dengan query tersebut.
Berikut adalah top-5 hasil pencarian yang relevan dengan query tersebut:
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

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Bot className="h-5 w-5 text-primary" />
          Ringkasan AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="mb-3 text-sm text-muted-foreground">Memuat ringkasan AI...</p>
        ) : error ? (
          <p className="mb-3 text-sm text-red-500">{error}</p>
        ) : (
          <p className="mb-3 text-sm text-muted-foreground">
            {summary}
          </p>
        )}
        <div className="text-xs text-muted-foreground">
          AI dapat melakukan kesalahan. Verifikasi informasi penting.
        </div>
      </CardContent>
    </Card>
  );
}
