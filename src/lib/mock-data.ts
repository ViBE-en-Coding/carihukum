interface SearchResult {
  id: string
  title: string
  type: string
  date: string
  number: string
  excerpt: string
  tags: string[]
}

// Generate mock search results based on query and filters
export function getMockSearchResults(query: string, page = 1, category?: string, year?: string): SearchResult[] {
  // If no query and no filters, return empty results
  if (!query && !category && !year) return []

  const results: SearchResult[] = []
  const baseYear = year ? Number.parseInt(year) : 2023

  // Map category ID to full name
  const getCategoryName = (id?: string) => {
    const map: Record<string, string> = {
      uu: "Undang-Undang",
      pp: "Peraturan Pemerintah",
      perpres: "Peraturan Presiden",
      permen: "Peraturan Menteri",
      perda: "Peraturan Daerah",
      putusan: "Putusan Pengadilan",
    }
    return id ? map[id] || "Lainnya" : "Undang-Undang"
  }

  // Generate 10 results per page
  for (let i = 0; i < 10; i++) {
    const resultId = (page - 1) * 10 + i + 1
    const resultType = category
      ? getCategoryName(category)
      : getCategoryName(["uu", "pp", "perpres", "permen", "perda"][i % 5])
    const resultYear = year || (baseYear - (i % 5)).toString()
    const resultNumber = `${Math.floor(Math.random() * 100) + 1}/${resultType.substring(0, 2).toUpperCase()}/${resultYear}`

    // Generate title based on query or default
    let title = query
      ? `${resultType} tentang ${query.charAt(0).toUpperCase() + query.slice(1)}`
      : `${resultType} tentang Perubahan Atas Peraturan ${i % 3 === 0 ? "Perlindungan Data" : i % 3 === 1 ? "Pelayanan Publik" : "Tata Kelola Pemerintahan"}`

    // Add number to make each title unique
    title += ` (Nomor ${resultNumber})`

    // Generate random date in the given year
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const date = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${resultYear}`

    // Generate excerpt
    const excerpts = [
      `Dalam rangka melaksanakan ketentuan ${query || "peraturan"} yang mengatur tentang tata kelola dan implementasi kebijakan publik, perlu menetapkan peraturan tentang...`,
      `Bahwa untuk melaksanakan ketentuan mengenai ${query || "kebijakan"} sebagaimana dimaksud dalam Pasal 15 ayat (2) perlu menetapkan...`,
      `Dengan berlakunya ${resultType} ini, semua peraturan yang berkaitan dengan ${query || "ketentuan"} sebelumnya dinyatakan tetap berlaku sepanjang tidak bertentangan dengan...`,
      `Untuk menjamin kepastian hukum dan memberikan perlindungan hukum dalam pelaksanaan ${query || "peraturan"} di Indonesia, perlu menetapkan...`,
      `Dalam rangka meningkatkan efektivitas dan efisiensi pelaksanaan ${query || "kebijakan"} sebagaimana diamanatkan dalam Undang-Undang Dasar Negara Republik Indonesia...`,
    ]

    // Generate tags
    const allTags = [
      "Administrasi",
      "Publik",
      "Pemerintahan",
      "Hukum",
      "Perdata",
      "Pidana",
      "Tata Usaha",
      "Agraria",
      "Perpajakan",
      "Lingkungan",
      "Kesehatan",
      "Pendidikan",
    ]
    const tags = []
    const numTags = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numTags; j++) {
      const randomTag = allTags[Math.floor(Math.random() * allTags.length)]
      if (!tags.includes(randomTag)) {
        tags.push(randomTag)
      }
    }

    // Add query as a tag if it exists
    if (query && !tags.includes(query) && tags.length < 3) {
      tags.push(query)
    }

    results.push({
      id: `doc-${resultId}`,
      title,
      type: resultType,
      date,
      number: resultNumber,
      excerpt: excerpts[i % excerpts.length],
      tags,
    })
  }

  return results
}
