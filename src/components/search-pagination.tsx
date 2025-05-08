"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchPaginationProps {
  currentPage: number
  totalPages: number
  query: string
  category?: string
  year?: string
}

export function SearchPagination({ currentPage, totalPages, query, category, year }: SearchPaginationProps) {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()

    if (query) params.set("q", query)
    if (category) params.set("category", category)
    if (year) params.set("year", year)
    params.set("page", page.toString())

    router.push(`/search?${params.toString()}`)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis if there's a gap after first page
    if (rangeStart > 2) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis if there's a gap before last page
    if (rangeEnd < totalPages - 1) {
      pages.push(-2) // -2 represents ellipsis (using different key)
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page, i) => {
        if (page < 0) {
          // Render ellipsis
          return (
            <Button key={`ellipsis-${i}`} variant="ghost" size="icon" disabled className="h-8 w-8 cursor-default">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(page)}
            className="h-8 w-8"
          >
            {page}
            <span className="sr-only">Page {page}</span>
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
