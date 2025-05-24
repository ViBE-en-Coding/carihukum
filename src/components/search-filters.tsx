'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFiltersProps {
  selectedDocType?: string;
  selectedYear?: string;
  query: string;
}

const docTypes = [
  { id: 'UU', label: 'Undang-Undang (UU)' },
  { id: 'PP', label: 'Peraturan Pemerintah (PP)' },
  { id: 'Perpres', label: 'Peraturan Presiden (Perpres)' },
  { id: 'UUDrt', label: 'Undang-Undang Darurat (UUDrt)' },
  { id: 'Keppres', label: 'Keputusan Presiden (Keppres)' },
  { id: 'Inpres', label: 'Instruksi Presiden (Inpres)' },
  { id: 'lainya', label: 'Lainnya' },
];

// Generate years from 1945 to 2025 (in descending order)
const years = Array.from({ length: 2025 - 1945 + 1 }, (_, i) => {
  const year = 2025 - i;
  return { id: year.toString(), label: year.toString() };
});

export function SearchFilters({
  selectedDocType = '',
  selectedYear = '',
  query,
}: SearchFiltersProps) {
  const router = useRouter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [docTypeExpanded, setDocTypeExpanded] = useState(true);
  const [yearExpanded, setYearExpanded] = useState(true);

  const handleDocTypeChange = (docTypeId: string) => {
    const newDocType = selectedDocType === docTypeId ? '' : docTypeId;
    updateFilters({ docType: newDocType, year: selectedYear });
  };  const handleYearChange = (yearId: string) => {
    const newYear = selectedYear === yearId ? '' : yearId;
    updateFilters({ docType: selectedDocType, year: newYear });
  };

  const updateFilters = ({
    docType,
    year,
  }: {
    docType: string;
    year: string;
  }) => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (docType) params.set('docType', docType);
    if (year) params.set('year', year);

    router.push(`/search?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const hasActiveFilters = selectedDocType || selectedYear;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          Filter
          {hasActiveFilters && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {(selectedDocType ? 1 : 0) + (selectedYear ? 1 : 0)}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-muted-foreground"
          >
            Reset
          </Button>
        )}
      </div>

      <AnimatePresence>
        {(showMobileFilters || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:h-auto md:opacity-100"
          >
            <div className="space-y-4">
              <div className="hidden items-center justify-between md:flex">
                <h3 className="flex items-center gap-1 font-medium">
                  <Filter className="h-4 w-4" /> Filter
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-7 text-xs text-muted-foreground"
                  >
                    Reset
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {' '}
                <div className="space-y-2">
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => setDocTypeExpanded(!docTypeExpanded)}
                  >
                    <h4 className="text-sm font-medium">Jenis Dokumen</h4>
                    {docTypeExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <AnimatePresence>
                    {docTypeExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {' '}
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {docTypes.map((docType) => (
                            <button
                              key={docType.id}
                              onClick={() => handleDocTypeChange(docType.id)}
                              className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${
                                selectedDocType === docType.id
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <span className="font-medium">
                                {docType.label}
                              </span>
                              {selectedDocType === docType.id && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => setYearExpanded(!yearExpanded)}
                  >
                    <h4 className="text-sm font-medium">Tahun</h4>
                    {yearExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <AnimatePresence>
                    {yearExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >                        <div className="space-y-2 pt-1">
                          <select
                            value={selectedYear}
                            onChange={(e) => handleYearChange(e.target.value)}
                            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="">Pilih Tahun</option>
                            {years.map((year) => (
                              <option key={year.id} value={year.id}>
                                {year.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
