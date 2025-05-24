import { NextResponse } from "next/server";

export async function OPTIONS() {
    const response = NextResponse.json({ status: 200 })
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin, xyz")
    response.headers.set("Access-Control-Max-Age", "86400")
    return response
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query');

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
        });
    }

    // ElasticSearch configuration
    const ES_ENDPOINT = process.env.ES_ENDPOINT || 'http://localhost:9200/your_index_name/';
    const ES_USERNAME = process.env.ES_USERNAME || 'elastic';
    const ES_PASSWORD = process.env.ES_PASSWORD || 'password';

    try {
        // Build ElasticSearch query
        const searchQuery = {
            "query": {
                "bool": {
                    "should": [
                        { "match": { "judul_autocomplete": "notaris" } },
                        { "match": { "abstrak_autocomplete": "notaris" } },
                        { "match": { "catatan_autocomplete": "notaris" } },
                        { "match": { "content_autocomplete": "notaris" } }
                    ],
                    "minimum_should_match": 1
                }
            },
            "_source": ["_id"],
            "highlight": {
                "pre_tags": ["**"],
                "post_tags": ["**"],
                "encoder": "html",
                "fields": {
                    "judul_autocomplete": {
                        "fragment_size": 100,
                        "number_of_fragments": 1
                    },
                    "abstrak_autocomplete": {
                        "fragment_size": 100,
                        "number_of_fragments": 1
                    },
                    "catatan_autocomplete": {
                        "fragment_size": 100,
                        "number_of_fragments": 1
                    },
                    "content_autocomplete": {
                        "fragment_size": 150,
                        "number_of_fragments": 1
                    }
                }
            },
            "size": 5
        }

        // Make request to ElasticSearch
        const response = await fetch(ES_ENDPOINT + '_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${ES_USERNAME}:${ES_PASSWORD}`).toString('base64')
            },
            body: JSON.stringify(searchQuery)
        });

        if (!response.ok) {
            let errorMessage = `ElasticSearch query failed with status ${response.status}`;
            let errorDetails;

            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorDetails = await response.json();
                } else {
                    errorDetails = await response.text();
                    console.error('Non-JSON error response:', errorDetails);
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
                errorDetails = await response.text();
            }

            return new Response(JSON.stringify({
                error: errorMessage,
                status: response.status,
                details: errorDetails
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let searchResults;
        try {
            searchResults = await response.json();
        } catch (parseError) {
            console.error('Error parsing search results:', parseError);
            const responseText = await response.text();
            return new Response(JSON.stringify({
                error: 'Failed to parse search results',
                details: responseText.substring(0, 1000) // Limit the response text length
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Extract QAC suggestions from the search results
        const qacSuggestions = searchResults.hits.hits
            .flatMap((hit: any) => {
                const suggestions: string[] = [];

                if (hit.highlight) {
                    // Extract suggestions from different highlight fields
                    if (hit.highlight.judul_autocomplete) {
                        suggestions.push(...hit.highlight.judul_autocomplete);
                    }
                    if (hit.highlight.abstrak_autocomplete) {
                        suggestions.push(...hit.highlight.abstrak_autocomplete);
                    }
                    if (hit.highlight.catatan_autocomplete) {
                        suggestions.push(...hit.highlight.catatan_autocomplete);
                    }
                    if (hit.highlight.content_autocomplete) {
                        suggestions.push(...hit.highlight.content_autocomplete);
                    }
                }

                return suggestions;
            })
            .filter((suggestion: string) => suggestion.length > 0)
            .map((suggestion: string) => {
                // Clean up the suggestion text
                suggestion = suggestion.replace(/[\n\r]+/g, ' ');
                // remove special characters except - , . and _ and *
                suggestion = suggestion.replace(/[^\w\s\-.,_*]/g, '');
                // remove extra spaces
                suggestion = suggestion.replace(/\s+/g, ' ');
                suggestion = suggestion.toLowerCase();

                // only grab 2 word in front and back of **[any text]**
                const regex = /(?:(?:\S+\s+){0,2})\*\*([^*]+)\*\*(?:\s+\S+){0,2}/g;
                let matches = [];
                let match;
                while ((match = regex.exec(suggestion)) !== null) {
                    matches.push(match[0].replace(/\*\*/g, '').trim());
                }

                return matches.length > 0 ? matches : suggestion.trim();
            })
            .reduce((acc: string[], curr: string[]) => {
                curr.forEach((item: string) => {
                    if (item && !acc.includes(item)) {
                        acc.push(item);
                    }
                });
                return acc;
            }, []);


        return new Response(JSON.stringify(qacSuggestions), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to execute search',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}