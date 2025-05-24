'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface AutocompleteResultsProps {
  results: string[];
  onSelect: (result: string) => void;
  query: string;
  isLoading?: boolean;
}

export function AutocompleteResults({
  results,
  onSelect,
  query,
  isLoading = false,
}: AutocompleteResultsProps) {
  return (
    <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-md border bg-background shadow-md">
      {isLoading ? (
        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
        </div>
      ) : (
        <ul className="py-2 max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <motion.li
              key={`${result}-${index}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.05 }}
            >
              <button
                className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none"
                onClick={() => onSelect(result)}
                type="button"
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span
                  className="flex-1 truncate"
                  dangerouslySetInnerHTML={{
                    __html: highlightQueryMatch(result, query),
                  }}
                />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}

function highlightQueryMatch(text: string, query: string) {
  if (!query) return text;

  // Escape special regex characters in query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<strong class="text-primary font-medium">$1</strong>');
}