'use client';

import type React from 'react';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { saveSearchToHistory } from '@/lib/search-history';
import { AutocompleteResults } from './autocomplete-results';

interface SearchFormProps {
  initialQuery?: string;
  compact?: boolean;
}

export function SearchForm({
  initialQuery = '',
  compact = false,
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const mockResults = [
        `${query} undang-undang`,
        `${query} peraturan pemerintah`,
        `${query} peraturan daerah`,
        `${query} keputusan presiden`,
        `${query} peraturan menteri`,
      ].filter((item) => item.length > 0);

      setAutocompleteResults(mockResults);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  }, [query]);

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
      className={cn(
        'group relative',
        compact ? 'w-full' : 'mx-auto w-full max-w-3xl'
      )}
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
            'border-primary/20 pr-12 transition-all duration-300 focus-visible:border-primary/50',
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
        />
      )}
    </form>
  );
}
