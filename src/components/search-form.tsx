'use client';

import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { saveSearchToHistory } from '@/lib/search-history';
import { getQuerySuggestions } from '@/lib/qac';

interface SearchFormProps {
  initialQuery?: string;
  compact?: boolean;
}

interface AutocompleteResultsProps {
  results: string[];
  onSelect: (selected: string) => void;
  query: string;
  isLoading?: boolean;
}

export function SearchForm({ initialQuery = '', compact = false }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    
    try {
      // Langsung terima array string dari getQuerySuggestions
      const suggestions = await getQuerySuggestions(searchQuery);
      setAutocompleteResults(suggestions);
      setShowAutocomplete(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setAutocompleteResults([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Handle input change dengan debounce
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, fetchSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setShowAutocomplete(false);
    saveSearchToHistory(query);

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    });
  };

  const handleAutocompleteSelect = (selected: string) => {
    setQuery(selected);
    setShowAutocomplete(false);
    saveSearchToHistory(selected);

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(selected)}`);
    });
  };

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('relative group', compact ? 'w-full' : 'w-full max-w-3xl mx-auto')}
    >
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Cari peraturan perundang-undangan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowAutocomplete(true)}
          className={cn(
            'pr-12 transition-all duration-300 border-primary/20 focus-visible:border-primary/50',
            compact ? 'h-10' : 'h-12 shadow-sm'
          )}
        />
        <Button
          type="submit"
          size={compact ? 'sm' : 'default'}
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
          disabled={isPending}
        >
          <Search className={cn(compact ? 'h-4 w-4' : 'h-5 w-5')} />
          <span className="sr-only">Cari</span>
        </Button>
      </div>

      {showAutocomplete && (
        <AutocompleteResults
          results={autocompleteResults}
          onSelect={handleAutocompleteSelect}
          query={query}
          isLoading={isLoadingSuggestions}
        />
      )}
    </form>
  );
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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mencari saran...
        </div>
      ) : (
        <ul className="py-2">
          {results.map((result) => (
            <motion.li
              key={result}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <button
                className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-muted"
                onClick={() => onSelect(result)}
                type="button"
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <span
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

// Helper function to highlight the matching part of the query
function highlightQueryMatch(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong class="text-primary">$1</strong>');
}