import { ArrowUpRight, FileText, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMockSearchResults } from "@/lib/mock-data"

interface SearchResultsProps {
  query: string
  page: number
  category?: string
  year?: string
}

export function SearchResults({ query, page, category, year }: SearchResultsProps) {
  // In a real app, this would fetch from an API
  const results = getMockSearchResults(query, page, category, year)

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Tidak ada hasil yang ditemukan</h3>
        <p className="text-muted-foreground mt-2">Coba gunakan kata kunci yang berbeda atau filter yang lebih umum</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-md mt-1">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium line-clamp-2">
                    <a href={`/document/${result.id}`} className="hover:underline inline-flex items-center gap-1">
                      {result.title}
                      <ArrowUpRight className="h-3 w-3 opacity-70" />
                    </a>
                  </h3>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {result.type}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {result.date}
                  </span>
                  <span>No. {result.number}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{result.excerpt}</p>
                <div className="flex flex-wrap gap-1 mt-2">
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
  )
}
