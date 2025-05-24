# CariHukum - Legal Document Search System

A modern, intelligent legal document search application built with Next.js and TypeScript. This system provides fast and accurate search capabilities for Indonesian legal documents with advanced AI-powered features including auto-completion, intelligent summaries, and comprehensive document analysis using Deepseek R1 671B.

## 🏗️ System Architecture

### Complete System Architecture
```
┌─────────────────────────────────────────┐
│              Frontend (Next.js)         │
├─────────────────────────────────────────┤
│  • Query Auto-Complete                  │
│  • Search Interface & History           │
│  • Document Viewer & Download           │
│  • AI Summary Display                   │
│  • Advanced Filtering & Pagination      │
└─────────────────────────────────────────┘
                    │
                    │ HTTP/REST API
                    ▼
┌─────────────────────────────────────────┐
│           Backend API Server            │
├─────────────────────────────────────────┤
│  • Search API Endpoint (/api/v1/search) │
│  • Auto-complete API                    │
│  • Document Processing & Serving        │
│  • AI Integration Layer                 │
└─────────────────────────────────────────┘
          │                    │
          │                    │ AI Processing
          ▼                    ▼
┌─────────────────┐    ┌──────────────────┐
│  ElasticSearch  │    │ Deepseek R1 671B │
│     Engine      │    │   AI Model       │
├─────────────────┤    ├──────────────────┤
│ • Full-text     │    │ • Document       │
│   Search        │    │   Summarization  │
│ • Auto-complete │    │ • Content        │
│   Suggestions   │    │   Analysis       │
│ • Indonesian    │    │ • Intelligent    │
│   Language      │    │   Insights       │
│   Processing    │    │                  │
└─────────────────┘    └──────────────────┘
```

### AI Integration Architecture
```
┌─────────────────────────────────────────┐
│           Search Results                │
│              Processing                 │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Deepseek R1 671B Model          │
├─────────────────────────────────────────┤
│  • Document Content Analysis            │
│  • Intelligent Summarization            │
│  • Contextual Information Extraction    │
│  • Legal Document Understanding         │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            AI Summary Output            │
├─────────────────────────────────────────┤
│  • Key Points Extraction                │
│  • Document Synopsis                    │
│  • Relevant Legal Concepts              │
│  • Structured Insights                  │
└─────────────────────────────────────────┘
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js 18.0 or higher
- Bun package manager (recommended for this project)
- Internet connection for API calls and AI integration

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd carihukum-fe
```

2. **Install dependencies using Bun**
```bash
# Install all dependencies
bun install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory based on the provided `.env.example`:

4. **Run the development server**
```bash
bun --bun dev
```

or if you prefer using npm:
```bash
bun dev
```

5. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
bun run build

# Start production server
bun start
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library with hooks and server components
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Bun** - Fast JavaScript runtime and package manager

### Backend
- **REST API** - HTTP-based API communication
- **ElasticSearch** - Full-text search engine
- **Deepseek R1 671B** - Large language model for AI summaries

### Search Engine Configuration
- **Indonesian Text Analysis** - Custom analyzers with stemming and stop words
- **Auto-complete Engine** - Real-time search suggestions
- **Inverted Index** - Optimized document indexing
- **Relevance Scoring** - Advanced ranking algorithms

## 🎯 Key Features

### 🔍 **Intelligent Search System**
- **Query Auto-Complete** - Real-time search suggestions as you type
- **Full-text Search** - Search through complete document content
- **Highlighted Results** - Search terms highlighted in titles and abstracts

### 🤖 **AI-Powered Features**
- **AI Summary** - Powered by Deepseek R1 671B for intelligent document summaries
- **Contextual Understanding** - Natural language processing
- **Smart Content Analysis** - AI-driven document insights

### 📚 **Document Management**
- **Document Viewer** - PDF preview for the documents
- **Document Download** - Direct download of legal documents
- **Multiple File Support** - Handle documents with multiple file attachments
- **File Format Support** - PDF and other document formats

### 🔧 **Advanced Filtering**
- **Document Type Filter** - Filter by type of legal document (UU, PP, Perpres, etc.)
- **Year Filter** - Filter documents by publication year
- **Category Filter** - Browse by legal categories and subjects
- **Status Filter** - Filter by document status (active, revoked, etc.)

### 📱 **User Experience**
- **Search History** - Keep track of previous searches
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - Graceful error states with helpful messages

## 📖 API Documentation

### Base URL
All API endpoints are available at: `http://localhost:3000/api/v1`

---

### 🔍 Search API

**Endpoint:** `GET /api/v1/search`

**Description:** Performs full-text search across Indonesian legal documents using ElasticSearch.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | ✅ Yes | - | Search query string |
| `page` | number | ❌ No | 1 | Page number for pagination |
| `limit` | number | ❌ No | 10 | Number of results per page |
| `docType` | string | ❌ No | - | Filter by document type (UU, PP, Perpres, UUDrt, Keppres, Inpres, lainya) |
| `year` | string | ❌ No | - | Filter by publication year (e.g., "2014") |

#### Available Document Types
- `UU` - Undang-Undang (Law)
- `PP` - Peraturan Pemerintah (Government Regulation)
- `Perpres` - Peraturan Presiden (Presidential Regulation)
- `UUDrt` - Undang-Undang Darurat (Emergency Law)
- `Keppres` - Keputusan Presiden (Presidential Decree)
- `Inpres` - Instruksi Presiden (Presidential Instruction)
- `lainya` - Other document types

#### Example Requests
```bash
# Basic search
GET /api/v1/search?query=peraturan%20pemerintah&page=1&limit=5

# Search with document type filter
GET /api/v1/search?query=notaris&docType=UU

# Search with year filter
GET /api/v1/search?query=pajak&year=2014

# Search with multiple filters
GET /api/v1/search?query=notaris&docType=UU&year=2014&page=1&limit=10
```

#### Response Format
```typescript
{
  "total": number,           // Total number of matching documents
  "took": number,            // Search execution time in milliseconds
  "page": number,            // Current page number
  "limit": number,           // Results per page
  "results": [
    {
      "score": number,       // Relevance score
      "id": string,          // Document ID
      "metadata": {
        "Judul": string,     // Document title
        "Nomor": string,     // Document number
        "Tahun": string,     // Publication year
        "Tanggal": string,   // Date
        "Status": string,    // Document status
        "Subjek": string,    // Subject/category
        // ... additional metadata fields
      },
      "highlight": {
        "metadata.Judul": string[],    // Highlighted title matches
        "abstrak": string[],           // Highlighted abstract matches
        "files.content": string[]      // Highlighted content matches
      },
      "abstract": string,              // Document abstract
      "files": [
        {
          "file_id": string,           // File identifier
          "filename": string,          // Original filename
          "download_url": string       // Direct download URL
        }
      ],
      "relations": object              // Related documents data
    }
  ]
}
```

#### Example Response
```json
{
  "total": 150,
  "took": 45,
  "page": 1,
  "limit": 5,
  "results": [
    {
      "score": 8.5,
      "id": "doc_123",
      "metadata": {
        "Judul": "Peraturan Pemerintah Republik Indonesia Nomor 24 Tahun 2018",
        "Nomor": "24 Tahun 2018",
        "Tahun": "2018",
        "Status": "Berlaku",
        "Subjek": "Pelayanan Perizinan Berusaha Terintegrasi Secara Elektronik"
      },
      "highlight": {
        "metadata.Judul": ["**Peraturan Pemerintah** Republik Indonesia"],
        "abstrak": ["mengatur tentang **peraturan** pelaksanaan"]
      },
      "abstract": "Peraturan ini mengatur tentang pelayanan perizinan berusaha...",
      "files": [
        {
          "file_id": "file_456",
          "filename": "pp_24_2018.pdf",
          "download_url": "https://example.com/download/pp_24_2018.pdf"
        }
      ],
      "relations": {}
    }
  ]
}
```

#### Error Responses

**400 Bad Request** - Missing query parameter
```json
{
  "error": "Query parameter is required"
}
```

**500 Internal Server Error** - Search execution failure
```json
{
  "error": "Failed to execute search",
  "details": "Connection timeout to ElasticSearch"
}
```

---

### 🎯 Query Auto-Complete API

**Endpoint:** `GET /api/v1/qac`

**Description:** Provides real-time search suggestions based on partial query input.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ Yes | Partial search query for suggestions |

#### Example Request
```bash
GET /api/v1/qac?query=perpres
```

#### Response Format
```typescript
string[]  // Array of suggestion strings
```

#### Example Response
```json
[
  "peraturan presiden nomor 16 tahun 2018",
  "perpres tentang pengadaan barang jasa",
  "peraturan presiden bidang investasi",
  "perpres nomor 12 tahun 2021 tentang",
  "peraturan presiden republik indonesia"
]
```

#### Error Responses

**400 Bad Request** - Missing query parameter
```json
{
  "error": "Query parameter is required"
}
```

**500 Internal Server Error** - Auto-complete failure
```json
{
  "error": "Failed to execute search",
  "details": "ElasticSearch connection error"
}
```

---

### 🤖 AI Summary API

**Endpoint:** `POST /api/v1/ai`

**Description:** Generates intelligent summaries of legal documents using Deepseek R1 671B model.

#### Request Body
```typescript
{
  "prompt": string  // Text content to summarize
}
```

#### Example Request
```bash
POST /api/v1/ai
Content-Type: application/json

{
  "prompt": "Summarize this legal document: [document content here]"
}
```

#### Response Format
```typescript
{
  "summary": string  // AI-generated summary
}
```

#### Example Response
```json
{
  "summary": "This regulation establishes the framework for integrated electronic business licensing services, streamlining the permit application process for businesses in Indonesia. Key provisions include digital submission requirements, standardized processing times, and inter-agency coordination mechanisms."
}
```

#### Error Responses

**400 Bad Request** - Invalid prompt
```json
{
  "error": "Invalid prompt"
}
```

**500 Internal Server Error** - AI processing failure
```json
{
  "error": "Internal Server Error"
}
```

---

### 📝 API Usage Examples

#### JavaScript/TypeScript Client

```typescript
// Search for documents
async function searchDocuments(query: string, page: number = 1) {
  const response = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}&page=${page}`);
  const data = await response.json();
  return data;
}

// Get auto-complete suggestions
async function getAutoComplete(query: string) {
  const response = await fetch(`/api/v1/qac?query=${encodeURIComponent(query)}`);
  const suggestions = await response.json();
  return suggestions;
}

// Generate AI summary
async function generateSummary(content: string) {
  const response = await fetch('/api/v1/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: content }),
  });
  const data = await response.json();
  return data.summary;
}
```

#### cURL Examples

```bash
# Search documents
curl -X GET "http://localhost:3000/api/v1/search?query=undang-undang&page=1&limit=10"

# Get auto-complete suggestions
curl -X GET "http://localhost:3000/api/v1/qac?query=perpres"

# Generate AI summary
curl -X POST "http://localhost:3000/api/v1/ai" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Summarize this legal document content..."}'
```

### 🔧 Environment Configuration

The API requires the following environment variables:

```bash
# ElasticSearch Configuration
ES_ENDPOINT=http://localhost:9200/your_index_name/
ES_USERNAME=elastic
ES_PASSWORD=your_password

# AI Integration
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 📊 Rate Limiting & Performance

- **Search API**: Optimized for fast response times, typically under 100ms
- **Auto-complete API**: Limited to 5 suggestions per request for performance
- **AI Summary API**: Response time varies based on content length (2-10 seconds)
- No explicit rate limiting is currently implemented

### 🛡️ Error Handling

All APIs follow consistent error response patterns:

1. **4xx Client Errors**: Invalid requests, missing parameters
2. **5xx Server Errors**: Internal processing failures, external service issues
3. **Detailed Error Messages**: Include specific failure reasons when possible
4. **Graceful Degradation**: APIs continue functioning even if some features fail

## 📊 Dataset and Data Sources

### Legal Document Dataset
The system searches through Indonesian legal documents including:

- **Undang-Undang (Laws)** - National legislation
- **Peraturan Pemerintah (Government Regulations)** - Executive regulations
- **Peraturan Presiden (Presidential Regulations)** - Presidential decrees
- **Peraturan Menteri (Ministerial Regulations)** - Ministry-level regulations
- **Keputusan (Decisions)** - Official government decisions

### Document Metadata
Each document contains structured metadata:
```typescript
interface DocumentMetadata {
  id: string;
  title: string;
  number: string;
  date: string;
  type: string;
  category: string;
  abstract: string;
  tags: string[];
  files: FileInfo[];
  score?: number;
  year: string;
  status: string;
  subject: string;
}
```

### ElasticSearch Index Configuration

#### Main Document Index
```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "indonesian_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "indonesian_stop", "indonesian_stemmer"]
        }
      },
      "filter": {
        "indonesian_stop": {
          "type": "stop",
          "stopwords": "_indonesian_"
        },
        "indonesian_stemmer": {
          "type": "stemmer",
          "language": "indonesian"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "metadata": {
        "properties": {
          "Tipe Dokumen": {"type": "keyword"},
          "Judul": {"type": "text", "analyzer": "indonesian_analyzer"},
          "T.E.U.": {"type": "text"},
          "Nomor": {"type": "keyword"},
          "Bentuk": {"type": "keyword"},
          "Bentuk Singkat": {"type": "keyword"},
          "Tahun": {"type": "keyword"},
          "Tempat Penetapan": {"type": "keyword"},
          "Tanggal Penetapan": {"type": "date", "format": "d MMMM yyyy||dd MMMM yyyy||yyyy-MM-dd||strict_date_optional_time"},
          "Tanggal Pengundangan": {"type": "date", "format": "d MMMM yyyy||dd MMMM yyyy||yyyy-MM-dd||strict_date_optional_time"},
          "Tanggal Berlaku": {"type": "date", "format": "d MMMM yyyy||dd MMMM yyyy||yyyy-MM-dd||strict_date_optional_time"},
          "Sumber": {"type": "text"},
          "Subjek": {"type": "keyword"},
          "Status": {"type": "keyword"},
          "Bahasa": {"type": "keyword"},
          "Lokasi": {"type": "keyword"},
          "Bidang": {"type": "keyword"}
        }
      },
      "relations": {"type": "object"},
      "files": {
        "type": "nested",
        "properties": {
          "file_id": {"type": "keyword"},
          "filename": {"type": "text"},
          "download_url": {"type": "text"},
          "content": {"type": "text", "analyzer": "indonesian_analyzer"}
        }
      },
      "abstrak": {
        "type": "text",
        "analyzer": "indonesian_analyzer",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "catatan": {
        "type": "text",
        "analyzer": "indonesian_analyzer",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      }
    }
  }
}
```

#### Auto-complete Index
```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "autocomplete_analyzer": {
          "type": "custom",
          "tokenizer": "keyword",
          "filter": ["lowercase", "edge_ngram_filter"]
        },
        "autocomplete_search_analyzer": {
          "type": "custom",
          "tokenizer": "keyword",
          "filter": ["lowercase"]
        }
      },
      "filter": {
        "edge_ngram_filter": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 20
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "judul_autocomplete": {
        "type": "text",
        "analyzer": "autocomplete_analyzer",
        "search_analyzer": "autocomplete_search_analyzer"
      },
      "judul_suggest": {
        "type": "completion"
      },
      "abstrak_autocomplete": {
        "type": "text",
        "analyzer": "autocomplete_analyzer",
        "search_analyzer": "autocomplete_search_analyzer"
      },
      "abstrak_suggest": {
        "type": "completion"
      },
      "catatan_autocomplete": {
        "type": "text",
        "analyzer": "autocomplete_analyzer",
        "search_analyzer": "autocomplete_search_analyzer"
      },
      "catatan_suggest": {
        "type": "completion"
      },
      "content_autocomplete": {
        "type": "text",
        "analyzer": "autocomplete_analyzer",
        "search_analyzer": "autocomplete_search_analyzer"
      }
    }
  }
}
```