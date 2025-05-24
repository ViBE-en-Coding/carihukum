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

## 📖 Usage Examples

### Basic Search
1. **Simple text search**
   ```
   Search: "hak asasi manusia"
   Results: Documents containing human rights-related content
   ```

2. **Document type filtering**
   ```
   Search: "pajak" + Filter: "Undang-Undang"
   Results: Tax-related laws only
   ```

3. **Year-based filtering**
   ```
   Search: "lingkungan" + Year: "2023"
   Results: Environmental regulations from 2023
   ```

### Advanced Features

#### 1. **Auto-Complete Search**
As you type, the system provides intelligent suggestions:
```
Type: "hak asa..."
Suggestions:
- "hak asasi manusia"
- "hak asasi politik"
- "hak asasi sipil"
```

#### 2. **AI-Powered Summaries**
Each search result includes an AI-generated summary:
```
Document: "UU No. 39 Tahun 1999 tentang Hak Asasi Manusia"
AI Summary: "Undang-undang ini mengatur tentang perlindungan, 
penghormatan, penegakan, dan pemajuan hak asasi manusia di Indonesia. 
Mencakup hak sipil, politik, ekonomi, sosial, dan budaya."
```

#### 3. **Highlighted Search Results**
Search terms are highlighted in titles and abstracts:
```
Title: "Undang-Undang tentang [HAK ASASI MANUSIA]"
Abstract: "Peraturan ini mengatur tentang [HAK ASASI MANUSIA] dan..."
```

#### 4. **PDF Document Preview**
- Click on any search result to open PDF preview
- Multiple file support with tab navigation
- Fallback viewers (Google Docs, Mozilla PDF.js)
- Download and external view options

#### 5. **Search History Management**
- Automatic storage of search queries
- Quick access to previous searches
- Search history persistence across sessions

#### 6. **Pagination and Navigation**
- Configurable results per page
- Dynamic pagination based on total results
- URL-based navigation for shareable links

### API Usage Example

```javascript
// Search documents programmatically
const searchResults = await fetch('/api/v1/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'hak asasi manusia',
    page: 1,
    category: 'Undang-Undang',
    year: '2023'
  })
});

const data = await searchResults.json();
console.log(data.results); // Array of search results
```

## 🔧 Configuration

### Search Configuration
Modify search behavior in `src/lib/search-api.ts`:
```typescript
const searchDocuments = async (params: SearchParams): Promise<SearchResponse> => {
  const searchParams = new URLSearchParams({
    query: params.query,
    page: params.page.toString(),
    limit: '10', // Results per page
    // Add custom parameters
  });
};
```

### AI Integration Configuration
Configure Deepseek R1 671B model settings:
```typescript
// src/lib/ai-config.ts
export const AI_CONFIG = {
  model: 'deepseek-chat',
  maxTokens: 1000,
  temperature: 0.1,
  systemPrompt: 'You are an AI assistant specializing in Indonesian legal documents...'
};
```

### ElasticSearch Configuration
```javascript
// ElasticSearch connection configuration
const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
```
