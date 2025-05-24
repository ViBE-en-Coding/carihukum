// API Response Types for Search Endpoint

export interface SearchApiResponse {
  total: number;
  took: number;
  page: number;
  limit: number;
  results: SearchApiResult[];
}

export interface SearchApiResult {
  score: number;
  id: string;
  metadata: SearchResultMetadata;
  highlight?: SearchHighlight;
  abstract?: string[];
  files: SearchResultFile[];
  relations: Record<string, any>;
}

export interface SearchResultMetadata {
  Judul: string;
  Nomor: string;
  Jenis?: string;
  Tahun?: string;
  Tanggal?: string;
  Instansi?: string;
  Status?: string;
  [key: string]: any; // For additional metadata fields
}

export interface SearchHighlight {
  'metadata.Judul'?: string[];
  abstrak?: string[];
  'files.content'?: string[];
  [key: string]: string[] | undefined;
}

export interface SearchResultFile {
  file_id: string;
  filename: string;
  download_url: string;
}

// Client-side types for components
export interface SearchResult {
  id: string;
  title: string;
  type: string;
  date: string;
  number: string;
  excerpt: string;
  tags: string[];
  score?: number;
  files?: SearchResultFile[];
  highlights?: SearchHighlight;
  abstract?: string[];
}

export interface SearchParams {
  query: string;
  page: number;
  limit?: number;
  category?: string;
  year?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  took: number;
}

// Error types
export interface SearchError {
  error: string;
  status?: number;
  details?: any;
}
