async function getDocuments(client, contractId, documentType, page = 1, pageSize = 5) {
    try {
        let startAfter = null;

        const response = await client.platform.documents.get(
            `${contractId}.${documentType}`,
            {
                where: [],
                limit: pageSize,
                ...(startAfter && { startAfter }),
                orderBy: [['$createdAt', 'asc']],
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