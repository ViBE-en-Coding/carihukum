import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface AiOverviewProps {
  query: string;
}

export function AiOverview({ query }: AiOverviewProps) {
  // TODO: Implement AI summary fetching here
  const getSummary = (query: string) => {
    return `Berdasarkan pencarian "${query}", berikut ringkasan informasi hukum terkait: Terdapat beberapa peraturan perundang-undangan yang relevan dengan kata kunci tersebut. Peraturan-peraturan ini mencakup berbagai aspek hukum seperti regulasi, ketentuan, dan pedoman yang berlaku di Indonesia.`;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Bot className="h-5 w-5 text-primary" />
          Ringkasan AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-muted-foreground">
          {getSummary(query)}
        </p>
        <div className="text-xs text-muted-foreground">
          AI dapat melakukan kesalahan. Verifikasi informasi penting.
        </div>
      </CardContent>
    </Card>
  );
}
