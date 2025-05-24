import {
  SearchApiResponse,
  SearchResult,
  SearchParams,
  SearchResponse,
  SearchError,
} from '@/types/search';
import { SAMPLE_SEARCH_RESPONSE } from './sample-response';

const API_BASE_URL = '/api/v1';

export async function searchDocuments(
  params: SearchParams
): Promise<SearchResponse> {
  const { query, page, limit = 10, category, year } = params;

  const searchParams = new URLSearchParams({
    query,
    page: page.toString(),
    limit: limit.toString(),
  });

  // Add optional filters
  if (category && category !== '') {
    searchParams.set('category', category);
  }
  if (year && year !== '') {
    searchParams.set('year', year);
  }

  try {
    // const response = await fetch(
    //   `${API_BASE_URL}/search?${searchParams.toString()}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );

    // if (!response.ok) {
    //   const errorData: SearchError = await response.json();
    //   throw new Error(
    //     errorData.error || `Search failed with status ${response.status}`
    //   );
    // }

    const apiResponse: SearchApiResponse = SAMPLE_SEARCH_RESPONSE;

    // Transform API response to match component interface
    const transformedResults: SearchResult[] = apiResponse.results.map(
      (result) => ({
        id: result.id,
        title: result.metadata.Judul ?? 'Untitled Document',
        type:
          result.metadata.Jenis ?? extractDocumentType(result.metadata.Nomor),
        date: String(result.metadata.Tahun),
        number: result.metadata.Nomor ?? 'No Number',
        excerpt: generateExcerpt(result.abstract, result.highlight),
        tags: generateTags(result.metadata, result.highlight),
        score: result.score,
        files: result.files,
        highlights: result.highlight,
        abstract: result.abstract,
      })
    );

    return {
      results: transformedResults,
      total: apiResponse.total,
      page: apiResponse.page,
      limit: apiResponse.limit,
      took: apiResponse.took,
    };
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
}

// Helper function to extract document type from number
function extractDocumentType(number: string): string {
  if (!number) return 'Dokumen';

  const upperNumber = number.toUpperCase();
  if (upperNumber.includes('UU')) return 'Undang-Undang';
  if (upperNumber.includes('PP')) return 'Peraturan Pemerintah';
  if (upperNumber.includes('PERPRES')) return 'Peraturan Presiden';
  if (upperNumber.includes('PERMEN')) return 'Peraturan Menteri';
  if (upperNumber.includes('PERDA')) return 'Peraturan Daerah';
  if (upperNumber.includes('PUTUSAN')) return 'Putusan Pengadilan';
  if (upperNumber.includes('KEPMEN')) return 'Keputusan Menteri';
  if (upperNumber.includes('KEPRES')) return 'Keputusan Presiden';

  return 'Dokumen';
}

// Helper function to generate excerpt from abstract and highlights
function generateExcerpt(abstract?: string[], highlights?: any): string {
  // If we have highlights, prefer those as they show relevant context
  if (highlights) {
    // Try to get highlighted content from various fields
    const highlightSources = [
      highlights['metadata.Judul'],
      highlights['abstrak'],
      highlights['files.content'],
    ]
      .filter(Boolean)
      .flat();

    if (highlightSources.length > 0) {
      // Take the first highlight and clean it up
      const excerpt = highlightSources[0]
        .replace(/\*\*/g, '') // Remove highlight markers
        .substring(0, 200); // Limit length
      return excerpt + (excerpt.length >= 200 ? '...' : '');
    }
  }

  // Fall back to abstract
  if (abstract && abstract.length > 0) {
    const abstractText = abstract.join(' ');
    const excerpt = abstractText.substring(0, 200);
    return excerpt + (excerpt.length >= 200 ? '...' : '');
  }

  // Default excerpt
  return 'Dokumen hukum yang mengatur tentang berbagai aspek kehidupan bermasyarakat dan bernegara.';
}

// Helper function to generate tags from metadata and highlights
function generateTags(metadata: any, highlights?: any): string[] {
  const tags: string[] = [];
  // Add document type as tag
  const type = metadata.Jenis ?? extractDocumentType(metadata.Nomor);
  tags.push(type);

  // Add institution if available
  if (metadata.Instansi) {
    tags.push(metadata.Instansi);
  }

  // Add status if available
  if (metadata.Status && metadata.Status !== 'Aktif') {
    tags.push(metadata.Status);
  }

  // Add year as tag
  const year = metadata.Tahun ?? new Date().getFullYear().toString();
  tags.push(year);

  // Add some topic-based tags from highlights or title
  const titleLower = (metadata.Judul ?? '').toLowerCase();
  const topicTags = [
    { keywords: ['administrasi', 'tata usaha'], tag: 'Administrasi' },
    { keywords: ['publik', 'pelayanan'], tag: 'Publik' },
    { keywords: ['pemerintah', 'negara'], tag: 'Pemerintahan' },
    { keywords: ['hukum', 'perdata'], tag: 'Hukum' },
    { keywords: ['pidana', 'kriminal'], tag: 'Pidana' },
    { keywords: ['pajak', 'bea'], tag: 'Perpajakan' },
    { keywords: ['lingkungan', 'alam'], tag: 'Lingkungan' },
    { keywords: ['kesehatan', 'medis'], tag: 'Kesehatan' },
    { keywords: ['pendidikan', 'sekolah'], tag: 'Pendidikan' },
    { keywords: ['agraria', 'tanah'], tag: 'Agraria' },
  ];

  topicTags.forEach(({ keywords, tag }) => {
    if (keywords.some((keyword) => titleLower.includes(keyword))) {
      tags.push(tag);
    }
  });

  // Limit to 4 tags maximum and remove duplicates
  return [...new Set(tags)].slice(0, 4);
}

// Helper function to parse highlighted text
export function parseHighlights(text: string): string {
  if (!text) return '';

  // Replace ** markers with proper HTML mark tags
  let result = text;
  let inHighlight = false;

  result = result.replace(/\*\*/g, () => {
    if (inHighlight) {
      inHighlight = false;
      return '</mark>';
    } else {
      inHighlight = true;
      return '<mark class="bg-yellow-200 px-1 rounded">';
    }
  });

  // Ensure we close any unclosed mark tags
  if (inHighlight) {
    result += '</mark>';
  }

  return result;
}

export { type SearchError };
