"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowUpRight } from "lucide-react"

interface AutocompleteResultsProps {
  results: string[]
  onSelect: (result: string) => void
  query: string
}

export function AutocompleteResults({ results, onSelect, query }: AutocompleteResultsProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [results])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (results.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault()
        onSelect(results[highlightedIndex])
      } else if (e.key === "Escape") {
        e.preventDefault()
        // Close dropdown handled by parent
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [results, highlightedIndex, onSelect])

  if (results.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-md overflow-hidden"
      >
        <ul className="py-1">
          {results.map((result, index) => (
            <li key={index}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 flex items-center gap-2 text-sm ${
                  index === highlightedIndex ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
                onClick={() => onSelect(result)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 truncate">{highlightQueryMatch(result, query)}</span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-50" />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  )
}

// Helper function to highlight the matching part of the query
function highlightQueryMatch(text: string, query: string) {
  if (!query) return text

  const regex = new RegExp(`(${query})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-medium">
        {part}
      </span>
    ) : (
      part
    ),
  )
}
