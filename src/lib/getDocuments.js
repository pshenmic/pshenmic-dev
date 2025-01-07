async function getDocuments(client, contractId, page = 1, pageSize = 5) {
    console.log('contractId', contractId)
    console.log('client', client)

    try {
        let startAfter = null;

        const response = await client.platform.documents.get(
            `pshenmic-dev-dfo.Project`,
            {
                // where: [],
                limit: pageSize,
                ...(startAfter && { startAfter }),
                // orderBy: [['$createdAt', 'asc']],
            }
        );

        const documentsData = response.map(document => document.getData());

        return {
            documents: documentsData,
            hasMore: response.length === pageSize,
            nextPage: page + 1
        };
    } catch (error) {
        console.error('Error fetching documents:', error);
        return {
            documents: [],
            hasMore: false,
            nextPage: page
        };
    }
}

export default getDocuments;