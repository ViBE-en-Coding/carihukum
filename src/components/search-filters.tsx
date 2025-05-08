"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface SearchFiltersProps {
  selectedCategory?: string
  selectedYear?: string
  query: string
}

const categories = [
  { id: "uu", label: "Undang-Undang" },
  { id: "pp", label: "Peraturan Pemerintah" },
  { id: "perpres", label: "Peraturan Presiden" },
  { id: "permen", label: "Peraturan Menteri" },
  { id: "perda", label: "Peraturan Daerah" },
  { id: "putusan", label: "Putusan Pengadilan" },
]

const years = [
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "2021", label: "2021" },
  { id: "2020", label: "2020" },
  { id: "2019", label: "2019" },
  { id: "2018", label: "2018" },
]

export function SearchFilters({ selectedCategory = "", selectedYear = "", query }: SearchFiltersProps) {
  const router = useRouter()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [categoryExpanded, setCategoryExpanded] = useState(true)
  const [yearExpanded, setYearExpanded] = useState(true)

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? "" : categoryId
    updateFilters({ category: newCategory, year: selectedYear })
  }

  const handleYearChange = (yearId: string) => {
    const newYear = selectedYear === yearId ? "" : yearId
    updateFilters({ category: selectedCategory, year: newYear })
  }

  const updateFilters = ({ category, year }: { category: string; year: string }) => {
    const params = new URLSearchParams()

    if (query) params.set("q", query)
    if (category) params.set("category", category)
    if (year) params.set("year", year)

    router.push(`/search?${params.toString()}`)
  }

  const resetFilters = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const hasActiveFilters = selectedCategory || selectedYear

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
              {(selectedCategory ? 1 : 0) + (selectedYear ? 1 : 0)}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-muted-foreground">
            Reset
          </Button>
        )}
      </div>

      <AnimatePresence>
        {(showMobileFilters || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:h-auto md:opacity-100"
          >
            <div className="space-y-4">
              <div className="hidden md:flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-1">
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
                <div className="space-y-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setCategoryExpanded(!categoryExpanded)}
                  >
                    <h4 className="text-sm font-medium">Jenis Peraturan</h4>
                    {categoryExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <AnimatePresence>
                    {categoryExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-1">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category.id}`}
                                checked={selectedCategory === category.id}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                              />
                              <Label htmlFor={`category-${category.id}`} className="text-sm">
                                {category.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
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
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-1">
                          {years.map((year) => (
                            <div key={year.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`year-${year.id}`}
                                checked={selectedYear === year.id}
                                onCheckedChange={() => handleYearChange(year.id)}
                              />
                              <Label htmlFor={`year-${year.id}`} className="text-sm">
                                {year.label}
                              </Label>
                            </div>
                          ))}
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
  )
}
