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
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const docType = searchParams.get('docType');
    const year = searchParams.get('year');

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
        });
    }

    // ElasticSearch configuration
    const ES_ENDPOINT = process.env.ES_ENDPOINT || 'http://localhost:9200/your_index_name/';
    const ES_USERNAME = process.env.ES_USERNAME || 'elastic';
    const ES_PASSWORD = process.env.ES_PASSWORD || 'password';

    // Calculate pagination parameters
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const from = (pageNum - 1) * limitNum;

    const startTime = Date.now();

    try {
        // Build filter conditions
        const filters: any[] = [];

        if (docType) {
            if (docType === 'lainya') {
                // Filter out the specific document types
                filters.push({
                    bool: {
                        must_not: [
                            { term: { "metadata.Bentuk Singkat": "Perpres" } },
                            { term: { "metadata.Bentuk Singkat": "PP" } },
                            { term: { "metadata.Bentuk Singkat": "UU" } },
                            { term: { "metadata.Bentuk Singkat": "UUDrt" } },
                            { term: { "metadata.Bentuk Singkat": "Keppres" } },
                            { term: { "metadata.Bentuk Singkat": "Inpres" } }
                        ]
                    }
                });
            } else {
                filters.push({
                    term: { "metadata.Bentuk Singkat": docType }
                });
            }
        }

        if (year) {
            filters.push({
                term: { "metadata.Tahun": year }
            });
        }

        // Build ElasticSearch query
        const buildSearchQuery = (includeFiles = true): any => ({
            from: from,
            size: limitNum,
            query: {
                bool: {
                    should: [
                        // Search in document title with higher boost
                        { match: { "metadata.Judul": { query: query, boost: 3.0 } } },
                        // Search in document number
                        { match: { "metadata.Nomor": { query: query, boost: 2.0 } } },
                        // Search in document content (conditionally included)
                        ...(includeFiles ? [{
                            nested: {
                                path: "files",
                                query: {
                                    match: { "files.content": query }
                                },
                                score_mode: "avg"
                            }
                        }] : []),
                        // Search in abstract
                        { match: { "abstrak": { query: query, boost: 2.0 } } },
                        // Search in notes
                        { match: { "catatan": query } }
                    ],
                    ...(filters.length > 0 && { filter: filters })
                }
            },
            highlight: {
                fields: {
                    "metadata.Judul": {},
                    "abstrak": {},
                    ...(includeFiles && { "files.content": {} })
                },
                pre_tags: ["**"],
                post_tags: ["**"]
            }
        });

        let searchQuery = buildSearchQuery(true);

        // Make request to ElasticSearch
        let response = await fetch(ES_ENDPOINT + '_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${ES_USERNAME}:${ES_PASSWORD}`).toString('base64')
            },
            body: JSON.stringify(searchQuery)
        });

        // If 400 error, retry without files.content
        if (response.status === 400) {
            console.log('Retrying search without files.content due to 400 error');
            searchQuery = buildSearchQuery(false);
            response = await fetch(ES_ENDPOINT + '_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${ES_USERNAME}:${ES_PASSWORD}`).toString('base64')
                },
                body: JSON.stringify(searchQuery)
            });
        }

        if (!response.ok) {
            let errorMessage = `ElasticSearch query failed with status ${response.status}`;
            let errorDetails;

            try {
                // Check content type before attempting to parse as JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorDetails = await response.json();
                } else {
                    // Handle non-JSON response
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

        // Format and return results
        const endTime = Date.now();
        return new Response(JSON.stringify({
            total: searchResults.hits.total.value,
            took: endTime - startTime,
            page: pageNum,
            limit: limitNum,
            results: searchResults.hits.hits.map((hit: any) => ({
                score: hit._score,
                id: hit._id,
                metadata: hit._source.metadata,
                highlight: hit.highlight,
                abstract: hit._source.abstrak,
                files: hit._source.files ? hit._source.files.map((file: any) => ({
                    file_id: file.file_id,
                    filename: file.filename,
                    download_url: file.download_url
                })) : [],
                relations: hit._source.relations || {}
            }))
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
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