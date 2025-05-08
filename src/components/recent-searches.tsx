"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSearchHistory, clearSearchHistory, removeSearchFromHistory } from "@/lib/search-history"
import { motion, AnimatePresence } from "framer-motion"

export function RecentSearches() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  const handleClearHistory = () => {
    clearSearchHistory()
    setSearchHistory([])
  }

  const handleRemoveSearch = (search: string) => {
    removeSearchFromHistory(search)
    setSearchHistory(getSearchHistory())
  }

  const handleSearchClick = (search: string) => {
    router.push(`/search?q=${encodeURIComponent(search)}`)
  }

  if (searchHistory.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Pencarian Terakhir
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearHistory}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          Hapus Semua
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {searchHistory.map((search, index) => (
            <motion.div
              key={search}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15, delay: index * 0.05 }}
            >
              <div className="group flex items-center bg-muted hover:bg-muted/80 rounded-full pr-2 pl-3 py-1">
                <button type="button" onClick={() => handleSearchClick(search)} className="text-sm mr-1">
                  {search}
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveSearch(search)
                  }}
                  className="h-5 w-5 p-0 rounded-full opacity-50 group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
