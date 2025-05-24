const API_BASE_URL = '/api/v1';

export async function getQuerySuggestions(query: string): Promise<string[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    // Sesuaikan dengan parameter yang diharapkan API (query bukan q)
    const response = await fetch(`${API_BASE_URL}/qac?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`QAC request failed with status ${response.status}`);
    }

    const suggestions: string[] = await response.json();
    
    // API sudah membatasi hingga 5 saran, tapi pastikan maksimal 5
    return suggestions.slice(0, 5);
  } catch (error) {
    console.error('Error fetching QAC suggestions:', error);
    
    // Fallback ke dummy data jika API gagal
    const dummySuggestions: string[] = [
      `${query} undang-undang`,
      `${query} peraturan pemerintah`,
      `${query} peraturan daerah`,
      `${query} keputusan presiden`,
      `${query} peraturan menteri`,
    ];
    
    return dummySuggestions.slice(0, 5);
  }
}