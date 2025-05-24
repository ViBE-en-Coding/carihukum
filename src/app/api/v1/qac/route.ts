import { NextRequest, NextResponse } from 'next/server';

// Dummy data untuk testing - hanya berupa array string
const DUMMY_SUGGESTIONS: string[] = [
  "undang-undang dasar",
  "undang-undang hak cipta", 
  "undang-undang perkawinan",
  "undang-undang kewarganegaraan",
  "undang-undang pemilu",
  "peraturan pemerintah pajak",
  "peraturan menteri pendidikan",
  "putusan pengadilan korupsi",
  "peraturan daerah jakarta",
  "keputusan presiden darurat",
];

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    // Simulasi delay untuk meniru network request
    await new Promise(resolve => setTimeout(resolve, 100));

    // Filter dummy suggestions berdasarkan query
    const filteredSuggestions = DUMMY_SUGGESTIONS
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Batasi hingga 5 saran

    // Tambahkan beberapa saran yang dinamis berdasarkan query
    const dynamicSuggestions: string[] = [
      `${query} undang-undang`,
      `${query} peraturan pemerintah`,
      `${query} peraturan daerah`,
      `${query} keputusan presiden`,
      `${query} peraturan menteri`,
    ];

    // Gabungkan dan deduplikasi
    const allSuggestions = [...filteredSuggestions, ...dynamicSuggestions];
    const uniqueSuggestions = allSuggestions
      .filter((suggestion, index, self) => 
        index === self.findIndex(s => s === suggestion)
      )
      .slice(0, 5);

    return NextResponse.json(uniqueSuggestions);
  } catch (error) {
    console.error('QAC API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}