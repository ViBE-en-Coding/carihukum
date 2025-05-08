// Maximum number of searches to store in history
const MAX_HISTORY_ITEMS = 10
const STORAGE_KEY = "search-history"

// Get search history from localStorage
export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return []

  try {
    const history = localStorage.getItem(STORAGE_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error("Error retrieving search history:", error)
    return []
  }
}

// Save a search query to history
export function saveSearchToHistory(query: string): void {
  if (typeof window === "undefined" || !query.trim()) return

  try {
    const history = getSearchHistory()

    // Remove the query if it already exists (to avoid duplicates)
    const filteredHistory = history.filter((item) => item !== query)

    // Add the new query to the beginning
    const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
  } catch (error) {
    console.error("Error saving search to history:", error)
  }
}

// Remove a specific search from history
export function removeSearchFromHistory(query: string): void {
  if (typeof window === "undefined") return

  try {
    const history = getSearchHistory()
    const newHistory = history.filter((item) => item !== query)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
  } catch (error) {
    console.error("Error removing search from history:", error)
  }
}

// Clear all search history
export function clearSearchHistory(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing search history:", error)
  }
}
